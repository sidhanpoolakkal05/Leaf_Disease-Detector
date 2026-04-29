from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import io
import random
import time

app = FastAPI(
    title="PhytoAI - Plant Disease Detector API",
    description="AI-powered plant disease detection backend",
    version="1.0.0"
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://leaf-disease-detector-one.vercel.app",
        "*",          # allow all during development — tighten in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Disease knowledge base ────────────────────────────────────────────────────
DISEASE_DB = [
    {
        "disease": "Tomato Early Blight",
        "confidence": 0.94,
        "crop": "Tomato",
        "type": "Fungal",
        "severity": "Moderate",
        "symptoms": [
            "Dark brown concentric ring spots on older leaves",
            "Yellow chlorotic halo surrounding lesions",
            "Premature defoliation starting from bottom",
        ],
        "treatment": [
            "Apply copper-based fungicide (Mancozeb or Chlorothalonil)",
            "Remove and destroy infected leaves immediately",
            "Improve air circulation by pruning dense foliage",
            "Avoid overhead irrigation — switch to drip",
        ],
        "prevention": [
            "Rotate crops — do not plant tomatoes in the same spot for 2 years",
            "Use certified disease-resistant varieties (Iron Lady, Mountain Magic)",
            "Mulch soil surface to prevent splash-back",
            "Apply neem oil spray weekly as a preventive",
        ],
        "organic_solution": "Spray a solution of 1 tbsp baking soda + 1 tsp dish soap in 1L water weekly.",
    },
    {
        "disease": "Apple Scab",
        "confidence": 0.89,
        "crop": "Apple",
        "type": "Fungal",
        "severity": "High",
        "symptoms": [
            "Olive-green to black velvety spots on leaves and fruit",
            "Distorted or cracked fruit surface",
            "Premature leaf and fruit drop",
        ],
        "treatment": [
            "Apply lime sulfur or copper fungicide at bud break",
            "Use systemic fungicides (myclobutanil, trifloxystrobin)",
            "Remove all fallen leaves and mummified fruits",
        ],
        "prevention": [
            "Plant scab-resistant apple varieties (Liberty, Redfree, Enterprise)",
            "Prune for open canopy to improve airflow",
            "Apply dormant-season copper sprays",
        ],
        "organic_solution": "Spray diluted neem oil (2%) every 7-10 days during wet spring weather.",
    },
    {
        "disease": "Corn Southern Rust",
        "confidence": 0.91,
        "crop": "Corn",
        "type": "Fungal",
        "severity": "Low",
        "symptoms": [
            "Small circular orange-yellow pustules on upper leaf surface",
            "Pustules turn dark brown as spores mature",
            "Leaves may yellow and die in severe infections",
        ],
        "treatment": [
            "Apply triazole or strobilurin fungicides (Headline, Aproach)",
            "Apply at VT / R1 growth stage for best results",
        ],
        "prevention": [
            "Plant rust-tolerant hybrids",
            "Scout fields frequently after tasseling",
            "Avoid nitrogen deficiency which increases susceptibility",
        ],
        "organic_solution": "Potassium bicarbonate sprays (5g/L) can reduce pustule spread.",
    },
    {
        "disease": "Potato Late Blight",
        "confidence": 0.97,
        "crop": "Potato",
        "type": "Oomycete",
        "severity": "Critical",
        "symptoms": [
            "Water-soaked, dark brown lesions on leaves with pale green border",
            "White fungal growth on leaf undersides in humid conditions",
            "Tuber rot — firm brown rot progressing inward",
        ],
        "treatment": [
            "Apply systemic fungicide (Metalaxyl, Dimethomorph) immediately",
            "Destroy infected plant material — do not compost",
            "Hill up soil around plants to protect tubers",
        ],
        "prevention": [
            "Use certified disease-free seed potatoes",
            "Plant resistant varieties (Sarpo Mira, Defender)",
            "Avoid overhead irrigation and ensure good drainage",
            "Apply preventive copper fungicide before symptoms appear",
        ],
        "organic_solution": "Copper-based Bordeaux mixture (1%) applied weekly provides good protection.",
    },
    {
        "disease": "Healthy Plant",
        "confidence": 0.98,
        "crop": "Unknown",
        "type": "None",
        "severity": "None",
        "symptoms": ["No disease symptoms detected"],
        "treatment": ["No treatment required"],
        "prevention": [
            "Continue regular monitoring",
            "Maintain proper fertilization and irrigation",
            "Inspect plants weekly for early signs of stress",
        ],
        "organic_solution": "Maintain plant health with compost tea foliar spray monthly.",
    },
]


# ── Endpoints ─────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "status": "online",
        "api": "PhytoAI Plant Disease Detector",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": time.time()}


@app.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    """
    Accepts a plant image (JPEG/PNG) and returns disease prediction.
    """
    # ── Validate file type
    if file.content_type not in ("image/jpeg", "image/png", "image/webp", "image/jpg"):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type: {file.content_type}. Only JPEG/PNG/WEBP accepted.",
        )

    # ── Read & validate image
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        image.verify()          # raises if corrupt
    except Exception:
        raise HTTPException(status_code=400, detail="Could not read image. File may be corrupt.")

    # ── Re-open after verify (verify() closes the file handle)
    image = Image.open(io.BytesIO(contents))
    width, height = image.size

    # ── Simulate inference delay (remove once real model is integrated)
    time.sleep(0.8)

    # ── Select prediction (replace this block with your real model call)
    prediction = random.choice(DISEASE_DB)

    # ── Build response
    return JSONResponse({
        "success": True,
        "filename": file.filename,
        "image_size": {"width": width, "height": height},
        "prediction": {
            "disease": prediction["disease"],
            "confidence": prediction["confidence"],
            "crop": prediction["crop"],
            "type": prediction["type"],
            "severity": prediction["severity"],
        },
        "details": {
            "symptoms": prediction["symptoms"],
            "treatment": prediction["treatment"],
            "prevention": prediction["prevention"],
            "organic_solution": prediction["organic_solution"],
        },
        "meta": {
            "model_version": "phytoai-v1-mock",
            "processing_time_ms": 800,
        },
    })


@app.get("/diseases")
def list_diseases():
    """Return the full disease knowledge base."""
    return {
        "total": len(DISEASE_DB),
        "diseases": [
            {
                "disease": d["disease"],
                "crop": d["crop"],
                "type": d["type"],
                "severity": d["severity"],
            }
            for d in DISEASE_DB
        ],
    }
