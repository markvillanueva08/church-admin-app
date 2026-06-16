"use client";
import React from "react";

type State = { hasError: boolean; error: Error | null };

export default class ClientErrorBoundary extends React.Component<{
  children: React.ReactNode;
}, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console — ClientErrorLogger already logs window errors, but
    // this gives component stack information as well.
    // eslint-disable-next-line no-console
    console.error("ClientErrorBoundary caught error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <h2 className="text-lg font-semibold">Something went wrong</h2>
          <pre className="mt-3 text-sm text-red-600">{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children as React.ReactElement;
  }
}
