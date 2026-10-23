import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const CameraCapture = () => {
    const webcamRef = useRef(null);

  // Estados de controle
    const [imageSrc, setImageSrc] = useState(null);
    const [facingMode, setFacingMode] = useState("user"); // "user" (frontal) ou "environment" (traseira)

  // Configurações de vídeo
    const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode,
    };

  // --- 1. CAPTURA DE FOTO ---
    const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
        const image = webcamRef.current.getScreenshot();
        setImageSrc(image);
    }
    }, [webcamRef]);

  // --- 2. ALTERNAR CÂMERA (Frontal / Traseira) ---
    const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    };

    return (
    <div style={styles.container}>
        <h2>Captura de Foto</h2>

      {/* Visualização da Câmera */}
        <div style={styles.webcamContainer}>
        <Webcam
          audio={false}
          muted={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={styles.webcam}
        />
        </div>

      {/* Botões de Controle */}
        <div style={styles.controls}>
        <button onClick={capturePhoto} style={styles.button}>
            📸 Tirar Foto
        </button>

        <button onClick={toggleCamera} style={styles.button}>
            🔄 Trocar Câmera
        </button>
        </div>

      {/* Resultados Capturados */}
        <div style={styles.results}>
        {/* Preview da Foto */}
        {imageSrc && (
            <div style={styles.resultBox}>
            <h3>Foto Capturada:</h3>
            <img src={imageSrc} alt="Captura" style={styles.mediaPreview} />
            <br />
            <a href={imageSrc} download="foto.jpg" style={styles.downloadLink}>
                ⬇️ Baixar Foto
            </a>
            </div>
        )}

      </div>
    </div>
  );
};

// Estilos básicos inline para organização
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  webcamContainer: {
    width: "100%",
    maxWidth: "640px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    backgroundColor: "#000",
  },
  webcam: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  controls: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#3498db",
    color: "#fff",
    fontWeight: "bold",
  },
  results: {
    marginTop: "30px",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  resultBox: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    maxWidth: "320px",
  },
  mediaPreview: {
    width: "100%",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  downloadLink: {
    display: "inline-block",
    marginTop: "5px",
    textDecoration: "none",
    color: "#3498db",
    fontWeight: "bold",
  },
};

export default CameraCapture;