"use client";

import { useEffect, useRef } from "react";
import type { Scene } from "./scenes";

const VERT = `#version 300 es
in vec2 a;
void main() { gl_Position = vec4(a, 0., 1.); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_c[4];
uniform int u_mode;
uniform float u_reveal;
out vec4 o;

const vec3 VEIL = vec3(0.957, 0.957, 0.945);

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0., a = .5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= .5; }
  return v;
}
vec3 ramp(float t) {
  t = clamp(t, 0., 1.) * 3.;
  return t < 1. ? mix(u_c[0], u_c[1], t) : t < 2. ? mix(u_c[1], u_c[2], t - 1.) : mix(u_c[2], u_c[3], t - 2.);
}
float bayer4(vec2 p) {
  const float m[16] = float[16](0., 8., 2., 10., 12., 4., 14., 6., 3., 11., 1., 9., 15., 7., 13., 5.);
  ivec2 q = ivec2(mod(p, 4.));
  return (m[q.x + q.y * 4] + .5) / 16.;
}

void main() {
  float s = min(u_res.x, u_res.y);
  vec2 p = (gl_FragCoord.xy - .5 * u_res) / s;
  float t = u_time;
  vec3 col;
  if (u_mode == 0) {
    vec2 q = p + .3 * vec2(fbm(p * 1.4 + t * .08), fbm(p * 1.4 - t * .07 + 3.)) - .15;
    vec3 acc = vec3(0);
    float w = 0.;
    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      vec2 c = .6 * vec2(sin(t * .21 + fi * 1.9), cos(t * .17 + fi * 2.7));
      float d = 1. / (pow(length(q - c), 2.2) + .02);
      acc += u_c[i] * d;
      w += d;
    }
    col = acc / w;
  } else if (u_mode == 1) {
    vec2 q = p * 1.4;
    float a = fbm(q + t * .05);
    float b = fbm(q + a * 2. + vec2(t * .03, -t * .04));
    float v = sin((q.x * .6 + q.y * .8 + b * 3.) * 4.) * .5 + .5;
    col = ramp(smoothstep(.1, .9, v * .7 + b * .5));
  } else if (u_mode == 2) {
    vec2 cell = floor(gl_FragCoord.xy / 3.);
    vec2 cp = (cell * 3. - .5 * u_res) / s;
    float v = fbm(cp * 2. + vec2(t * .15, -t * .1));
    v = smoothstep(.2, .8, v + .25 * sin(length(cp) * 6. - t));
    col = mix(u_c[0], u_c[1], step(bayer4(cell), v));
  } else {
    vec2 q = p * 1.2;
    vec2 r = vec2(fbm(q + t * .06), fbm(q + vec2(5.2, 1.3) - t * .05));
    float f = fbm(q + 3. * r);
    col = ramp(f * 1.25) + u_c[3] * pow(f, 4.);
  }
  col += (hash(gl_FragCoord.xy + fract(t)) - .5) * .045;
  o = vec4(mix(VEIL, col, u_reveal), 1.);
}`;

const rgb = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

function compile(gl: WebGL2RenderingContext) {
  const program = gl.createProgram();
  if (!program) return null;
  for (const [type, src] of [
    [gl.VERTEX_SHADER, VERT],
    [gl.FRAGMENT_SHADER, FRAG],
  ] as const) {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    gl.attachShader(program, sh);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );
  const a = gl.getAttribLocation(program, "a");
  gl.enableVertexAttribArray(a);
  gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
  return program;
}

export default function ShaderCanvas({
  scene,
  reveal,
  still,
  onReady,
}: {
  scene: Scene;
  reveal: number;
  still: boolean;
  onReady: () => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const target = useRef(reveal);
  const sceneRef = useRef(scene);
  const redraw = useRef<() => void>(() => {});
  target.current = reveal;
  sceneRef.current = scene;

  useEffect(() => redraw.current(), [scene, reveal]);

  useEffect(() => {
    const el = canvas.current!;
    const gl = el.getContext("webgl2", {
      antialias: false,
      powerPreference: "low-power",
    });
    const program = gl && compile(gl);
    if (!gl || !program) return;

    const loc = (n: string) => gl.getUniformLocation(program, n);
    const [uRes, uTime, uC, uMode, uReveal] = [
      "u_res",
      "u_time",
      "u_c",
      "u_mode",
      "u_reveal",
    ].map(loc);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      el.width = Math.max(1, Math.round(el.clientWidth * dpr));
      el.height = Math.max(1, Math.round(el.clientHeight * dpr));
      gl.viewport(0, 0, el.width, el.height);
    };

    let shown = still ? target.current : 0;
    let time = 7;
    let last = performance.now();
    let visible = true;
    let raf = 0;
    let ready = false;

    const draw = () => {
      const { mode, colors } = sceneRef.current;
      gl.uniform2f(uRes, el.width, el.height);
      gl.uniform1f(uTime, time);
      gl.uniform3fv(uC, colors.flatMap(rgb));
      gl.uniform1i(uMode, mode);
      gl.uniform1f(uReveal, shown);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!ready) {
        ready = true;
        onReady();
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      time += dt;
      shown += (target.current - shown) * Math.min(dt * 1.6, 1);
      draw();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (still || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    redraw.current = () => {
      if (!still) return;
      shown = target.current;
      draw();
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (still) draw();
    });
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(el);

    resize();
    if (still) draw();
    else start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      redraw.current = () => {};
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [still, onReady]);

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className="absolute inset-0 block h-full w-full"
    />
  );
}
