import ProductDetailsSection from './ProductDetailsSection';
import { Component, type ReactNode, type ErrorInfo } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ color: "red" }}>Something went wrong in ProductDetailsSection.</div>;
    }
    return this.props.children;
  }
}

export default function SecondHomePage() {
 
  return (
    <div className="min-h-screen bg-black font-poppins">
      <ErrorBoundary>
        <ProductDetailsSection />
      </ErrorBoundary>
    </div>
  );
}
