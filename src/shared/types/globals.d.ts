declare module '*.mp3';
declare module '*.html' {
  const content: string;
  export default content;
}
