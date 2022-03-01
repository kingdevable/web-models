export default function App() {
    return (
        <div className="loader-container">
            <video
                src="videos/loading.mp4"
                className="loader"
                autoPlay
                loop
                playsInline
                muted
            ></video>
        </div>
    );
}
