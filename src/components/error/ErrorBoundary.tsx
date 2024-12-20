import React from "react"

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    state: { error: { message: string } | null } = { error: null }
    static getDerivedStateFromError(error: { message: string }) {
        return { error }
    }
    render() {
        const { error } = this.state
        if (error) {
            return (
                <div role="alert">
                    There was an error: <pre className="text-[1rem] text-red-500">{error.message}</pre>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary