import "./Loading.css"

export default function Loading() {
    return (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">در حال بارگذاری...</p>
        </div>
    )
}
