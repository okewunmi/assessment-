"use client";
import "./globals.css";
import Map from "@/components/Map";
import Header from "@/components/Header";
import { listings } from "../data/properties";
import RelatedFile from "@/components/related";

export default function Home() {
  return (
    <div className="main">
      <Header />
      <Map listings={listings} />
    </div>
  );
}
