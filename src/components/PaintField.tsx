import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Plane } from 'ogl';

const vertex = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragment = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  
  // Noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.y = 1.0 - st.y;
    
    // Mouse interaction
    float dist = distance(st, uMouse);
    float force = smoothstep(0.15, 0.0, dist);
    
    // Domain warp
    vec2 q = vec2(0.);
    q.x = snoise(st + vec2(0.0, uTime * 0.1));
    q.y = snoise(st + vec2(1.0, uTime * 0.2));
    
    vec2 r = vec2(0.);
    r.x = snoise(st + 1.0*q + vec2(1.7,9.2) + uTime * 0.15);
    r.y = snoise(st + 1.0*q + vec2(8.3,2.8) + uTime * 0.126);
    
    float f = snoise(st + r + (force * 0.5));
    
    // Vertical stripes melting
    float stripe = sin(st.x * 20.0 + (f * 5.0 * st.y));
    
    vec3 col1 = vec3(0.129, 0.004, 0.0); // Bistre
    vec3 col2 = vec3(0.902, 0.639, 0.255); // Goldfinch
    vec3 col3 = vec3(0.549, 0.035, 0.008); // Garnet
    
    vec3 finalCol = mix(col1, col2, smoothstep(-1.0, 1.0, stripe));
    finalCol = mix(finalCol, col3, f);
    
    // Fake height / Impasto look
    float bump = snoise(st * 10.0 + r);
    finalCol += bump * 0.1;
    
    gl_FragColor = vec4(finalCol, 1.0);
  }
`;

export const PaintField: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 1.5) });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);

    const geometry = new Plane(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [window.innerWidth, window.innerHeight] },
        uMouse: { value: [0.5, 0.5] }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    let animationId: number;
    let mouse = [0.5, 0.5];

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uResolution.value = [window.innerWidth, window.innerHeight];
    };
    
    const onMouseMove = (e: MouseEvent) => {
      mouse[0] = e.clientX / window.innerWidth;
      mouse[1] = e.clientY / window.innerHeight;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    resize();

    const update = (t: number) => {
      animationId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      
      // Interpolate mouse for smooth smearing
      program.uniforms.uMouse.value[0] += (mouse[0] - program.uniforms.uMouse.value[0]) * 0.1;
      program.uniforms.uMouse.value[1] += (mouse[1] - program.uniforms.uMouse.value[1]) * 0.1;
      
      renderer.render({ scene: mesh });
    };
    animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
      if (containerRef.current?.contains(gl.canvas)) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden" 
      style={{
        background: 'linear-gradient(180deg, var(--color-bistre) 0%, var(--color-garnet) 100%)'
      }} 
    />
  );
};
