import React from "react";
import { Header }  from "./components"
import { Carousel } from './components';
import { Footer } from "./components";
import {ErrorBoundary}  from "./components";
import {images} from "./resources";

export function App () {

    return (
        <ErrorBoundary>
            <div>
                <Header />
                <Carousel images={images} />
                <Footer />
            </div>
        </ErrorBoundary>)
}
