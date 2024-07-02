
import React from 'react';
import { Header, Carousel, Footer, ErrorBoundary } from "./components";
import { images } from "./resources";

export const App = () => (
    <ErrorBoundary>
        <div>
            <Header />
            <Carousel images={images} />
            <Footer />
        </div>
    </ErrorBoundary>
);


