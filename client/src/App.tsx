import React from "react";
import { Router, Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import Home from "@/pages/home";
import InquiryPage from "@/pages/inquiry";
import NotFound from "@/pages/not-found";
import ErrorBoundary from "@/components/ErrorBoundary";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/inquiry" component={InquiryPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppRouter />
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
