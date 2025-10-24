'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log error to external service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Add error logging service (e.g., Sentry, LogRocket)
      console.error('Production error:', error);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

interface DefaultErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

function DefaultErrorFallback({ error, resetError }: DefaultErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-red-500 mb-2">🎬</h1>
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-6">
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 mb-6 text-left">
          <h3 className="text-white font-semibold mb-2">Error Details:</h3>
          <pre className="text-red-400 text-sm overflow-auto">
            {error.message}
          </pre>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-2">
              <summary className="text-gray-400 cursor-pointer">Stack Trace</summary>
              <pre className="text-gray-500 text-xs mt-2 overflow-auto">
                {error.stack}
              </pre>
            </details>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={resetError}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
