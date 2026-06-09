type VideoPlayerProps = {
  title: string;
  src: string;
};

export function VideoPlayer({ title, src }: VideoPlayerProps) {
  return (
    <section className="playerShell" aria-label={`${title} video player`}>
      <video className="videoPlayer" controls preload="metadata">
        <source src={src} type="video/mp4" />
        Your browser does not support the video element.
      </video>
    </section>
  );
}
