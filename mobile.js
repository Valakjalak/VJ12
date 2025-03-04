let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  touchEndX = 0;
  touchEndY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  let highestZ = 1;

class Paper {
  holdingPaper = false;
  rotating = false;
  touchStartX = 0;
  touchStartY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    // Ensure touch gestures are recognized properly
    paper.style.touchAction = "none";

    paper.addEventListener("touchstart", (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });

    paper.addEventListener("touchmove", (e) => {
      if (this.holdingPaper) {
        e.preventDefault(); // Prevents scrolling only when moving paper

        if (e.touches.length === 1 && !this.rotating) {
          // Single touch drag
          this.touchMoveX = e.touches[0].clientX;
          this.touchMoveY = e.touches[0].clientY;

          this.velX = this.touchMoveX - this.prevTouchX;
          this.velY = this.touchMoveY - this.prevTouchY;

          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;

          this.prevTouchX = this.touchMoveX;
          this.prevTouchY = this.touchMoveY;
        }

        if (e.touches.length === 2) {
          // Two-finger rotation
          this.rotating = true;
          let dx = e.touches[1].clientX - e.touches[0].clientX;
          let dy = e.touches[1].clientY - e.touches[0].clientY;
          let angle = Math.atan2(dy, dx) * (180 / Math.PI);
          this.rotation = angle;
        }

        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
      }
    });

    paper.addEventListener("touchend", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

// Select and initialize all paper elements
const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});


    paper.addEventListener('touchstart', (e) => {
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });
    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // For two-finger rotation on touch screens
    paper.addEventListener('gesturestart', (e) => {
      e.preventDefault();
      this.rotating = true;
    });
    paper.addEventListener('gestureend', () => {
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
