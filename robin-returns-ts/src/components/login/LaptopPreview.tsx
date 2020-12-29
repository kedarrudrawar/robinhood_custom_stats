import { ReactComponent as LaptopPreviewSVG } from "ui/images/laptopPreview.svg";

export function LaptopPreview() {
  return (
    <div className="preview-container gray-bg">
      <LaptopPreviewSVG className="graphic" />
    </div>
  );
}
