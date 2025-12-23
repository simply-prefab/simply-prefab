'use client'

import { Home, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

interface SimpleIFCViewerProps {
  width?: string;
  height?: string;
  modelUrl?: string;
}

const SimpleIFCViewer: React.FC<SimpleIFCViewerProps> = ({
  width = '100%',
  height = '600px',
  modelUrl,
}) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<OrbitControls>();
  const currentModelRef = useRef<THREE.Object3D | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [currentModel, setCurrentModel] = useState<string>('demo');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F5F5);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(10, 10, 10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 500;
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const animate = () => {
      requestAnimationFrame(animate);
      try {
        controls.update();
        const r = rendererRef.current;
        const s = sceneRef.current;
        const c = cameraRef.current;
        if (r && s && c) r.render(s, c);
      } catch (err) {
        console.error('Render loop error', err);
      }
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const clearExistingModels = () => {
    if (sceneRef.current) {
      sceneRef.current.children = sceneRef.current.children.filter(
        (child) =>
          child.type === 'AmbientLight' ||
          child.type === 'DirectionalLight' ||
          child.type === 'HemisphereLight'
      );
    }
    currentModelRef.current = null;
  };

  const fitCameraToObject = (object: THREE.Object3D) => {
    if (!cameraRef.current || !controlsRef.current) return;

    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = cameraRef.current.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraZ *= 1.8;

    cameraRef.current.position.set(
      center.x + cameraZ * 0.7,
      center.y + cameraZ * 0.5,
      center.z + cameraZ * 0.7
    );
    cameraRef.current.lookAt(center);
    controlsRef.current.target.copy(center);
    controlsRef.current.update();
  };

  const loadOBJWithMTL = async (objUrl: string, mtlUrl: string) => {
    if (!sceneRef.current) return;
    console.info('Starting OBJ load', { objUrl, mtlUrl });
    setIsLoading(true);
    setModelLoaded(false);
    setError(null);
    clearExistingModels();

    return new Promise<void>((resolve, reject) => {
      const mtlLoader = new MTLLoader();
      mtlLoader.load(
        mtlUrl,
        (materials) => {
          try {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(
              objUrl,
              (object) => {
                object.userData.isModel = true;
                currentModelRef.current = object;
                sceneRef.current?.add(object);
                fitCameraToObject(object);
                setIsLoading(false);
                setModelLoaded(true);
                setCurrentModel('obj');
                resolve();
              },
              undefined,
              (error) => {
                console.error('OBJ load with MTL failed', error);
                setError(t('viewer.errors.failedToLoadOBJ', { message: error?.message || String(error) }));
                setIsLoading(false);
                setModelLoaded(false);
                reject(error);
              }
            );
          } catch (err) {
            console.error('Error applying materials to OBJ', err);
            const objLoader = new OBJLoader();
            objLoader.load(
              objUrl,
              (object) => {
                object.userData.isModel = true;
                currentModelRef.current = object;
                sceneRef.current?.add(object);
                fitCameraToObject(object);
                setIsLoading(false);
                setModelLoaded(true);
                setCurrentModel('obj');
                resolve();
              },
              undefined,
              (error) => {
                console.error('Fallback OBJ-only load failed', error);
                setError(t('viewer.errors.failedToLoadOBJ', { message: error?.message || String(error) }));
                setIsLoading(false);
                setModelLoaded(false);
                reject(error);
              }
            );
          }
        },
        undefined,
        (error) => {
          console.warn('MTL load failed, falling back to OBJ-only load', error);
          const objLoader = new OBJLoader();
          objLoader.load(
            objUrl,
            (object) => {
              object.userData.isModel = true;
              currentModelRef.current = object;
              sceneRef.current?.add(object);
              fitCameraToObject(object);
              setIsLoading(false);
              setModelLoaded(true);
              setCurrentModel('obj');
              resolve();
            },
            undefined,
            (objErr) => {
              console.error('OBJ-only load also failed', objErr);
              setError(t('viewer.errors.failedToLoadOBJOrMTL', { message: objErr?.message || String(objErr) }));
              setIsLoading(false);
              setModelLoaded(false);
              reject(objErr);
            }
          );
        }
      );
    });
  };

  const loadStandardModel = async (url: string) => {
    if (!sceneRef.current) return;
    setIsLoading(true);
    setModelLoaded(false);
    setError(null);
    clearExistingModels();

    const ext = url.split('.').pop()?.toLowerCase() || '';
    let loader: any;

    try {
      if (ext === 'fbx') loader = new FBXLoader();
      else if (ext === 'glb' || ext === 'gltf') loader = new GLTFLoader();
      else throw new Error(t('viewer.errors.unsupportedFormat'));

      loader.load(
        url,
        (loaded: any) => {
          const object = loaded.scene ? loaded.scene : loaded;
          object.userData.isModel = true;
          currentModelRef.current = object;
          sceneRef.current?.add(object);
          fitCameraToObject(object);
          setIsLoading(false);
          setModelLoaded(true);
          setCurrentModel('standard');
        },
        undefined,
        (err: any) => {
          setError(t('viewer.errors.failedToLoadModel', { message: err.message }));
          setIsLoading(false);
          setModelLoaded(false);
        }
      );
    } catch (err: any) {
      setError(t('viewer.errors.errorLoadingModel', { message: err.message }));
      setIsLoading(false);
      setModelLoaded(false);
    }
  };

  const loadModel = async (url: string) => {
    if (!url) {
      loadDemoModel();
      return;
    }
    console.info('loadModel called with', url);
    const ext = url.split('.').pop()?.toLowerCase() || '';
    if (ext === 'obj') {
      const mtlUrl = url.replace(/\.obj$/, '.mtl');
      await loadOBJWithMTL(url, mtlUrl);
    } else if (ext === 'fbx' || ext === 'glb' || ext === 'gltf') {
      await loadStandardModel(url);
    } else {
      setError(t('viewer.errors.unsupportedFileType', { ext }));
      loadDemoModel();
    }
  };

  const loadDemoModel = () => {
    if (!sceneRef.current) return;
    clearExistingModels();

    const houseGroup = new THREE.Group();

    const baseGeometry = new THREE.BoxGeometry(6, 0.2, 6);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x8B7D6B, roughness: 0.8 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.1;
    houseGroup.add(base);

    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xFFE0C0, roughness: 0.7 });
    const wallGeometry = new THREE.BoxGeometry(6, 4, 0.2);

    const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
    frontWall.position.set(0, 2.1, 3);
    houseGroup.add(frontWall);

    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.set(0, 2.1, -3);
    houseGroup.add(backWall);

    const sideWallGeometry = new THREE.BoxGeometry(0.2, 4, 6);
    const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    leftWall.position.set(-3, 2.1, 0);
    houseGroup.add(leftWall);

    const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    rightWall.position.set(3, 2.1, 0);
    houseGroup.add(rightWall);

    const roofGeometry = new THREE.ConeGeometry(4.5, 2, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xC55A00, roughness: 0.9 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 5.1;
    roof.rotation.y = Math.PI / 4;
    houseGroup.add(roof);

    houseGroup.userData.isDemoModel = true;
    currentModelRef.current = houseGroup;
    sceneRef.current.add(houseGroup);
    fitCameraToObject(houseGroup);
    setCurrentModel('demo');
    setModelLoaded(true);
  };

  useEffect(() => {
    if (modelUrl) loadModel(modelUrl);
    else loadDemoModel();
  }, [modelUrl]);

  const resetView = () => {
    if (!cameraRef.current || !controlsRef.current || !currentModelRef.current) return;
    fitCameraToObject(currentModelRef.current);
  };

  const zoomIn = () => {
    if (!cameraRef.current) return;
    const direction = new THREE.Vector3();
    cameraRef.current.getWorldDirection(direction);
    cameraRef.current.position.add(direction.multiplyScalar(2));
  };

  const zoomOut = () => {
    if (!cameraRef.current) return;
    const direction = new THREE.Vector3();
    cameraRef.current.getWorldDirection(direction);
    cameraRef.current.position.add(direction.multiplyScalar(-2));
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) document.exitFullscreen();
      else containerRef.current.requestFullscreen();
    }
  };

  return (
    <Card style={{ width, height, border: '2px solid #FB921D' }} className="relative shadow-xl">
      <CardContent className="p-0 relative" style={{ height: 'calc(100% - 80px)' }}>
        {error && (
          <div className="absolute top-0 left-0 right-0 z-20 p-4">
            <Alert className="border-2" style={{ borderColor: '#FB921D', backgroundColor: '#FFF5E6' }}>
              <AlertDescription style={{ color: '#666' }}>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        <div
          ref={containerRef}
          className="w-full h-full relative"
          style={{ minHeight: height, backgroundColor: '#F5F5F5' }}
        />

        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="p-6 rounded-lg shadow-lg text-center" style={{ backgroundColor: 'white', border: '2px solid #FB921D' }}>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4" style={{ borderColor: '#FB921D' }}></div>
              <p className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>{t('viewer.loading')}</p>
            </div>
          </div>
        )}

        {modelLoaded && !isLoading && (
          <div className="absolute bottom-4 left-4 flex gap-2 rounded-lg p-2 shadow-lg z-10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={resetView} 
              title={t('viewer.controls.resetView')}
              className="border-2 transition-all"
              style={{ borderColor: '#FB921D', color: '#FB921D' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#FB921D';
                (e.currentTarget as HTMLElement).style.color = 'white';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#FB921D';
              }}
            >
              <Home className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={zoomIn} 
              title={t('viewer.controls.zoomIn')}
              className="border transition-all"
              style={{ borderColor: '#FFD0A0', color: '#C55A00' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#FB921D';
                (e.currentTarget as HTMLElement).style.color = '#FB921D';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#FFD0A0';
                (e.currentTarget as HTMLElement).style.color = '#C55A00';
              }}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={zoomOut} 
              title={t('viewer.controls.zoomOut')}
              className="border transition-all"
              style={{ borderColor: '#FFD0A0', color: '#C55A00' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#FB921D';
                (e.currentTarget as HTMLElement).style.color = '#FB921D';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#FFD0A0';
                (e.currentTarget as HTMLElement).style.color = '#C55A00';
              }}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={toggleFullscreen} 
              title={t('viewer.controls.fullscreen')}
              className="border transition-all"
              style={{ borderColor: '#FFD0A0', color: '#C55A00' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#FB921D';
                (e.currentTarget as HTMLElement).style.color = '#FB921D';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#FFD0A0';
                (e.currentTarget as HTMLElement).style.color = '#C55A00';
              }}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        )}

        {modelLoaded && !isLoading && (
          <div className="absolute top-4 right-4 rounded-lg p-3 shadow-lg text-xs z-10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}>
            <div className="font-bold flex items-center" style={{ color: '#FB921D' }}>
              ✓{' '}
              {currentModel === 'demo'
                ? t('viewer.status.demoModel')
                : currentModel === 'obj'
                  ? t('viewer.status.objLoaded')
                  : t('viewer.status.modelLoaded')}
            </div>
            <div className="mt-1" style={{ color: '#666' }}>{t('viewer.status.mouseInstruction')}</div>
            <div className="mt-1" style={{ color: '#C55A00' }}>{t('viewer.status.contactForCustom')}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SimpleIFCViewer;
