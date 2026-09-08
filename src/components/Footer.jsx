import React from 'react';
import { SocialLinks } from './SocialLinks.jsx';

export function Footer() {
  return (
    <footer className="footer">
      <div className="col">
        <span className="sig">EatMakro</span>
        <span>Weighed, not guessed.</span>
        <span>Hyderabad · pre-launch</span>
      </div>
      <div className="col">
        <span className="mono">Returnable steel · no disposable box</span>
        <span className="mono">Direct to customer · no aggregator</span>
        <a href="#hold">Hold a slot</a>
      </div>
      <div className="col">
        <span className="mono">Find us</span>
        <SocialLinks compact />
      </div>
    </footer>
  );
}
