import React, { useEffect, useState } from 'react';

const HomeView = ({ onNavigate, onNavigateMoments, onNavigateShreya }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const reasonsData = [
    { img: "/assets/coresal!.jpg", text: "Shreya, Tumhari Simplicity" },
    { img: "/assets/1.jpg", text: "Tumahara dedication" },
    { img: "/assets/3.jpg", text: "Your kindness and Nature" },
    { img: "/assets/4.jpg", text: "And ofcorse your Cuteness" },
    { img: "/assets/5.jpg", text: "Your passion for the things you love" },
    { img: "/assets/6.jpg", text: "How you make me a better person espically spritually" },
    { img: "/assets/7.jpg", text: "And many more...." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % reasonsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reasonsData.length]);

  useEffect(() => {
    // Exact Javascript replica
    const heartContainer = document.querySelector(".floating-hearts");
    let bubbleInterval;

    if (heartContainer) {
      const createBubble = () => {
        const bubble = document.createElement("span");
        bubble.textContent = "Radhe Radhe";

        // size between 30-50px
        const size = Math.random() * 20 + 30; 
        bubble.style.left = Math.random() * 100 + "%";
        bubble.style.fontSize = `${Math.random() * 0.5 + 0.8}rem`;
        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;

        heartContainer.appendChild(bubble);

        setTimeout(() => {
          bubble.remove();
        }, 15000); // Remove after animation ends
      };
      bubbleInterval = setInterval(createBubble, 800); // One bubble every 0.8s
    }

    //navbar
    const nav = document.querySelector(".navigation");
    const heroSection = document.querySelector("#hero");
    let observer;

    if (heroSection && nav) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            nav.style.opacity = "1";
            nav.style.pointerEvents = "auto";
          } else {
            nav.style.opacity = "0";
            nav.style.pointerEvents = "none";
          }
        },
        {
          root: null,
          threshold: 0.1,
        }
      );
      observer.observe(heroSection);
    }

    // Music Toggle
    const musicToggle = document.getElementById("musicToggle");
    const bgMusic = document.getElementById("bgMusic");

    const handleMusicToggle = () => {
      if (bgMusic.paused) {
        bgMusic.play().catch(e => console.log(e));
        musicToggle.classList.remove("muted");
      } else {
        bgMusic.pause();
        musicToggle.classList.add("muted");
      }
    };
    if (musicToggle && bgMusic) {
      musicToggle.addEventListener("click", handleMusicToggle);
    }

    // Piano Melody
    const playMelody = document.getElementById("playMelody");
    const melodyAudio = document.getElementById("melodyAudio");

    const handlePlayMelody = () => {
      melodyAudio.currentTime = 0;
      melodyAudio.play().catch(e => console.log(e));
    };
    if (playMelody && melodyAudio) {
      playMelody.addEventListener("click", handlePlayMelody);
    }

    // Floating Hearts
    const floatingHearts = document.querySelector(".floating-hearts");
    if (floatingHearts) {
      for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${15 + Math.random() * 10}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        floatingHearts.appendChild(heart);
      }
    }

    // Timeline Animation
    const timelineItems = document.querySelectorAll(".timeline-item");
    
    function checkScroll() {
      timelineItems.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < window.innerHeight * 0.8) {
          item.classList.add("animate");
        }
      });

      // Love Letter Animation
      const loveTexts = document.querySelectorAll(".love-text");
      loveTexts.forEach((text) => {
        const textTop = text.getBoundingClientRect().top;
        if (textTop < window.innerHeight * 0.8) {
          text.classList.add("visible");
        }
      });

      // Wishes Animation
      const wishCards = document.querySelectorAll(".wish-card");
      wishCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight * 0.8) {
          setTimeout(() => {
            card.classList.add("animate");
          }, index * 200);
        }
      });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Check on load

    // Smooth Scrolling
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if(targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    };
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    const carousel = document.querySelector(".carousel");
    const carouselItems = document.querySelectorAll(".carousel-item");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".carousel-dots");
    let slideInterval;

    if (carousel && prevBtn && nextBtn && dotsContainer) {
      let currentIndex = 0;

      // Create dots
      dotsContainer.innerHTML = '';
      carouselItems.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
          goToSlide(index);
        });
        dotsContainer.appendChild(dot);
      });

      const dots = document.querySelectorAll(".dot");

      function goToSlide(index) {
        if (index < 0) index = carouselItems.length - 1;
        if (index >= carouselItems.length) index = 0;

        carouselItems.forEach((item) => {
          item.style.transform = `translateX(-${index * 100}%)`;
        });

        dots.forEach((dot) => dot.classList.remove("active"));
        if(dots[index]) dots[index].classList.add("active");

        currentIndex = index;
      }

      const handlePrev = () => goToSlide(currentIndex - 1);
      const handleNext = () => goToSlide(currentIndex + 1);

      prevBtn.addEventListener("click", handlePrev);
      nextBtn.addEventListener("click", handleNext);

      // Auto slide
      slideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);

      // Pause on hover
      const handleMouseEnter = () => clearInterval(slideInterval);
      const handleMouseLeave = () => {
        slideInterval = setInterval(() => {
          goToSlide(currentIndex + 1);
        }, 5000);
      };
      
      carousel.addEventListener("mouseenter", handleMouseEnter);
      carousel.addEventListener("mouseleave", handleMouseLeave);
    }

    // Video Modal
    const videoBtn = document.getElementById("videoButton");
    const videoModal = document.getElementById("videoModal");
    let closeVideoModal;
    const birthdayVideo = document.getElementById("birthdayVideo");

    if (videoBtn && videoModal) {
      closeVideoModal = videoModal.querySelector(".close-modal");
      videoBtn.addEventListener("click", () => {
        videoModal.style.display = "flex";
        // Add confetti when video opens
        createConfetti();
      });

      if(closeVideoModal) {
        closeVideoModal.addEventListener("click", () => {
          videoModal.style.display = "none";
          if(birthdayVideo) birthdayVideo.pause();
        });
      }

      if(birthdayVideo) {
        birthdayVideo.addEventListener("ended", () => {
          createConfetti();
        });
      }
    }

    // Gallery Modal
    const galleryItems = document.querySelectorAll(".gallery-item");
    const galleryModal = document.getElementById("galleryModal");
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");
    let closeGalleryModal;

    if (galleryModal) {
      closeGalleryModal = galleryModal.querySelector(".close-modal");

      galleryItems.forEach((item) => {
        // Only target items that have an img for the lightbox
        const imgEl = item.querySelector("img");
        if(imgEl) {
          item.addEventListener("click", () => {
            const imgSrc = imgEl.src;
            const captionEl = item.querySelector(".gallery-caption p");
            const caption = captionEl ? captionEl.textContent : "";

            if(modalImage) modalImage.src = imgSrc;
            if(modalCaption) modalCaption.textContent = caption;
            galleryModal.style.display = "flex";
          });
        }
      });

      if (closeGalleryModal) {
        closeGalleryModal.addEventListener("click", () => {
          galleryModal.style.display = "none";
        });
      }
    }

    // Close modals when clicking outside
    const handleOutsideClick = (e) => {
      if (videoModal && e.target === videoModal) {
        videoModal.style.display = "none";
        if(birthdayVideo) birthdayVideo.pause();
      }
      if (galleryModal && e.target === galleryModal) {
        galleryModal.style.display = "none";
      }
    };
    window.addEventListener("click", handleOutsideClick);

    // Confetti Animation
    function createConfetti() {
      const confettiContainer = document.createElement("div");
      confettiContainer.style.position = "fixed";
      confettiContainer.style.top = "0";
      confettiContainer.style.left = "0";
      confettiContainer.style.width = "100%";
      confettiContainer.style.height = "100%";
      confettiContainer.style.pointerEvents = "none";
      confettiContainer.style.zIndex = "9999";
      document.body.appendChild(confettiContainer);

      const colors = ["#f7cac9", "#d8c2e7", "#bd8c7d", "#d4af37", "#fffff0"];

      for (let i = 0; i < 200; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 5 + 5}px`;
        confetti.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = "-10px";
        confetti.style.borderRadius = "50%";
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        confettiContainer.appendChild(confetti);

        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;

        confetti.animate(
          [
            { transform: "translateY(0) rotate(0deg)", opacity: 1 },
            {
              transform: `translateY(${window.innerHeight}px) rotate(${
                Math.random() * 360
              }deg)`,
              opacity: 0,
            },
          ],
          {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: "cubic-bezier(0.1, 0.8, 0.3, 1)",
            fill: "forwards",
          }
        );
      }

      setTimeout(() => {
        if(document.body.contains(confettiContainer)) {
          confettiContainer.remove();
        }
      }, 6000);
    }

    // Star Heart Animation
    const starHeart = document.getElementById("starHeart");

    function createStarParticle() {
      const particle = document.createElement("div");
      particle.className = "star-particle";

      // Heart shape coordinates using parametric equations
      const t = Math.random() * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      particle.style.position = "absolute";
      particle.style.left = `${50 + x * 1.5}%`;
      particle.style.top = `${50 - y * 1.5}%`;
      particle.style.width = "2px";
      particle.style.height = "2px";
      particle.style.borderRadius = "50%";
      particle.style.background = "white";
      particle.style.opacity = "0.6";
      particle.style.boxShadow = `0 0 4px white`;
      particle.style.animationDelay = `${Math.random() * 3}s`;

      if(starHeart) starHeart.appendChild(particle);

      const int = setInterval(() => {
        if(!document.body.contains(particle)) {
          clearInterval(int);
          return;
        }
        particle.style.opacity = Math.random() * 0.5 + 0.5;
        particle.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px white`;
      }, Math.random() * 2000 + 1000);
    }

    if(starHeart) {
      // Create 100 stars in heart shape
      for (let i = 0; i < 100; i++) {
        createStarParticle();
      }
    }

    // EASTER EGG HEARTS
    const hiddenHearts = document.querySelectorAll(".hidden-heart");

    hiddenHearts.forEach((heart) => {
      const x = Math.random() * 90 + 5; // 5–95%
      const y = Math.random() * 80 + 10; // a little margin from top/bottom

      Object.assign(heart.style, {
        position: "fixed",
        left: `${x}%`,
        top: `${y}%`,
        width: "20px",
        height: "20px",
        background:
          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23f7cac9"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>\') no-repeat center center',
        backgroundSize: "contain",
        opacity: "0.3",
        cursor: "pointer",
        zIndex: "1000",
      });

      heart.addEventListener("click", () => {
        const message = heart.getAttribute("data-message");

        const popup = document.createElement("div");
        Object.assign(popup.style, {
          position: "fixed",
          left: `${x}%`,
          top: `${y - 5}%`,
          background: "white",
          padding: "10px 15px",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          zIndex: "1001",
          fontFamily: "Great Vibes, cursive",
          fontSize: "1.2rem",
          color: "#bd8c7d",
          transition: "opacity 0.5s ease",
        });

        popup.textContent = message;
        document.body.appendChild(popup);

        setTimeout(() => {
          popup.style.opacity = "0";
          setTimeout(() => {
            if(document.body.contains(popup)) popup.remove();
          }, 500);
        }, 3000);
      });
    });

    // Cleanup phase
    return () => {
      clearInterval(bubbleInterval);
      clearInterval(slideInterval);
      window.removeEventListener("scroll", checkScroll);
      anchors.forEach((anchor) => anchor.removeEventListener("click", handleAnchorClick));
      window.removeEventListener("click", handleOutsideClick);
      if(observer) observer.disconnect();
      if(musicToggle) musicToggle.removeEventListener("click", handleMusicToggle);
    };
  }, []);

  return (
    <>
      {/* Audio Control */}
      <div className="audio-control">
        <button id="musicToggle" aria-label="Toggle background music">
          <span className="music-on">♪</span>
          <span className="music-off">♪</span>
        </button>
        <audio id="bgMusic" loop>
          <source src="/assets/background-music.mp3" type="audio/mp3" />
        </audio>
      </div>

      {/* Navigation */}
      <nav className="navigation">
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#journey">Our Journey</a></li>
          <li><a href="#letter">Love Letter</a></li>
          <li><a href="#reasons">Why I Love You</a></li>
          <li>
            <a href="#video">Surprise</a>
          </li>
          <li>
            <a href="#gallery">Memories</a>
          </li>
          <li>
            <a href="#message">Message</a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateMoments(); }}>Moments Gallery 😍</a>
          </li>
          <li>
            <a href="#" className="btn-small" onClick={(e) => { e.preventDefault(); onNavigateShreya(); }}>
              SHREYA ❤️
            </a>
          </li>
          <li>
            <a href="#" className="btn-small" onClick={(e) => { e.preventDefault(); onNavigate(); }}>
              The First Time We Met 💞
            </a>
          </li>
          <li>
            <a
              href="https://youtu.be/kchqmpOwWP4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wishing Video(link)
            </a>
          </li>
          <li>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScdmuimP8bvzRLLxb3TEFewvAyhLl19oZpu3cR5E9-vhHP_Cw/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              Baate kare??
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1 className="fade-in">Happy Birthday, My Love</h1>
          <p className="fade-in delay-1">
            A little digital surprise from the one who loves you most
          </p>
          <a href="#journey" className="btn fade-in delay-2">Start the Journey</a>
        </div>
        <div className="floating-hearts"></div>
      </section>

      {/* Our Journey Together */}
      <section id="journey" className="journey">
        <h2>Our Journey Together</h2>
        <div className="timeline">
          <div className="timeline-item left">
            <div className="timeline-content">
              <div className="polaroid">
                <img src="/assets/first_pic_saw.jpg" alt="The pic which I saw" />
                <p className="caption">When our eyes first met (virtual)</p>
                <p className="date">
                  The first pic of yours which I saw and literally fell for you
                </p>
              </div>
            </div>
          </div>
          <div className="timeline-item right">
            <div className="timeline-content">
              <div className="polaroid">
                <img src="/assets/distance.jpg" alt="U distanceing phase" />
                <p className="caption">You in this phase makes me sure</p>
                <p className="date">
                  Distance incresed but trust harden in this time
                </p>
              </div>
            </div>
          </div>
          <div className="timeline-item left">
            <div className="timeline-content">
              <div className="polaroid">
                <img src="/assets/video_call.jpg" alt="videocall" />
                <p className="caption">Mine favorite video call</p>
                <p className="date">Breaked the 4th wall</p>
              </div>
            </div>
          </div>
          <div className="timeline-item right">
            <div className="timeline-content">
              <div className="polaroid">
                <img src="/assets/Endless.jpg" alt="Endless Confessions" />
                <p className="caption">
                  Our endless confession towards eachother always feels great
                </p>
                <p className="date">Endless Confessions</p>
              </div>
            </div>
          </div>
          <div className="timeline-item left">
            <div className="timeline-content">
              <div className="polaroid">
                <img src="/assets/First_meet.png" alt="Today" />
                <p className="caption">First_meet</p>
                <p className="date">Us</p>
              </div>
            </div>
          </div>
          <div className="timeline-item right">
            <div className="timeline-content">
              <div className="polaroid">
                <img src="/assets/Today and forever.jpg" alt="Today" />
                <p className="caption">Today and forever</p>
                <p className="date">Your Rishabh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section id="letter" className="letter">
        <div className="letter-container">
          <h2>My Love Letter to You</h2>
          <div className="letter-content">
            <p className="love-text">My Dearest,</p>
            <p className="love-text">
              As you celebrate another year of your beautiful life, I wanted to
              take a moment to tell you just how much you mean to me. Every day
              with you is a gift for me I admire deeply.
            </p>
            <p className="love-text">
              Teri muskaan mere andheron mein roshni ban jaati hai.<br />Teri
              hansi ek aisi dhun hai jo mere dil mein har waqt bajti rehti hai.<br />
              Tujhse mile hue jabana ho gaya hai, par tera khayal har pal mere
              saath hota hai.
            </p>
            <p className="love-text quote">
              "If I could write a story, it would begin and end with you."
            </p>
            <p className="love-text">
              Unfortunately You were not my past but u are my present, will be
              definetily my future. Thank you for being the extraordinary person
              that you are.
            </p>
            <p className="love-text">
              Happy Birthday, my love.<br />
              Here's I decidate a song to you.
            </p>
            <p className="love-text signature">Forever Yours</p>
          </div>
          <button id="playMelody" className="btn melody-btn">Play a Melody</button>
          <audio id="melodyAudio">
            <source src="/assets/piano-melody.mp3" type="audio/mp3" />
          </audio>
        </div>
      </section>

      {/* Reasons I Love You */}
      <section id="reasons" className="reasons">
        <h2 className="relative z-10 w-full text-center">Reasons I Love You</h2>
        <div className="relative flex justify-center items-center w-full max-w-[1000px] mx-auto min-h-[450px]">
          <button onClick={() => setActiveSlide((prev) => (prev - 1 + reasonsData.length) % reasonsData.length)} className="carousel-btn prev absolute left-2 z-20" aria-label="Previous reason">
            ❮
          </button>
          
          <div className="relative w-full h-[400px] flex justify-center items-center overflow-hidden rounded-2xl mx-10">
            {reasonsData.map((reason, index) => (
              <div
                key={index}
                className={`absolute w-full h-full flex justify-center items-center transition-all duration-500 ease-in-out ${
                  index === activeSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"
                }`}
              >
                <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-[var(--blush-pink)] max-w-[400px] w-full text-center hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-64 overflow-hidden rounded-lg mb-4 bg-gray-100 block">
                    <img src={reason.img} alt="reason" className="w-full h-full object-cover object-center" />
                  </div>
                  <p className="font-poppins text-[1.1rem] text-[var(--dark-text)] font-medium leading-relaxed">{reason.text}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setActiveSlide((prev) => (prev + 1) % reasonsData.length)} className="carousel-btn next absolute right-2 z-20" aria-label="Next reason">
            ❯
          </button>
        </div>
        
        <div className="flex justify-center mt-6 gap-3 relative z-10 w-full">
          {reasonsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border-none outline-none ${
                idx === activeSlide ? "bg-[var(--rose-gold)] scale-150" : "bg-[var(--blush-pink)] hover:bg-[var(--rose-gold)]"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Birthday Video Surprise */}
      <section id="video" className="video">
        <h2>A Special Surprise</h2>
        <div className="video-container">
          <button
            id="videoButton"
            className="video-btn"
            aria-label="Open birthday video"
          >
            <div className="gift-box">
              <div className="gift-lid"></div>
              <div className="gift-box-body"></div>
              <div className="gift-ribbon"></div>
            </div>
            <span>Click to Open</span>
          </button>
        </div>
      </section>

      {/* Video Modal */}
      <div id="videoModal" className="modal">
        <div className="modal-content">
          <span className="close-modal">&times;</span>
          <div className="video-wrapper">
            <video id="birthdayVideo" controls>
              <source src="/assets/birthday-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Gallery Wall */}
      <section id="gallery" className="gallery">
        <h2>Our Memories</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <video src="/assets/memory1.mp4" controls poster="/assets/thubnail3.jpg"></video>
            <div className="gallery-caption">
              <p>My Cutu ❤️❤️</p>
            </div>
          </div>
          <div className="gallery-item">
            <video
              src="/assets/Special moments.mp4"
              controls
              poster="/assets/thubnail2.jpg"
            ></video>
            <div className="gallery-caption">
              <p>See in Picture in Picture</p>
            </div>
          </div>
          <div className="gallery-item">
            <video src="/assets/memory6.mp4" controls poster="/assets/thubnail1.jpg"></video>
            <div className="gallery-caption">
              <p>The Confession 🤌🏽🤌🏽</p>
            </div>
          </div>
          <div className="gallery-item">
            <img src="/assets/memory2.jpg" alt="Memory 4" />
            <div className="gallery-caption">
              <p>Mid Night Talks</p>
            </div>
          </div>
          <div className="gallery-item">
            <img src="/assets/memory4.jpg" alt="Memory 5" />
            <div className="gallery-caption">
              <p>The way you admire🫠🫠</p>
            </div>
          </div>
          <div className="gallery-item">
            <img src="/assets/memory5.jpg" alt="Memory 6" />
            <div className="gallery-caption">
              <p>The peace in front of u</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <div id="galleryModal" className="modal">
        <div className="modal-content gallery-modal-content">
          <span className="close-modal">&times;</span>
          <img id="modalImage" src="/placeholder.svg" alt="Enlarged photo" />
          <p id="modalCaption"></p>
        </div>
      </div>

      {/* Wishes from Friends & Family */}
      <section id="wishes" className="wishes">
        <h2>Birthday Wishes</h2>
        <div className="wishes-container">
          <div className="wish-card">
            <div className="wish-profile">
              <img src="/assets/Wish1.jpg" alt="Friend 1" />
            </div>
            <div className="wish-content">
              <h3>Me as Friend</h3>
              <p>
                Happy birthday to the most amazing friend! You deserve all the
                happiness in the world. Love you lots! <br />
                Ache se enjoy kar! 🎉😄
              </p>
            </div>
          </div>
          <div className="wish-card">
            <div className="wish-profile">
              <img src="/assets/wish2.jpg" alt="Friend 2" />
            </div>
            <div className="wish-content">
              <h3>Me as a boyfriend</h3>
              <p>
                "Janamdin mubarak ho meri Cookie 💖<br />
                Tera aana meri zindagi ka sabse khoobsurat hissa ban gaya hai. Har
                pal main tera shukriya karta hoon — apni muskaan, apna pyaar, aur
                apna sab kuch mere saath baantne ke liye. Aaj tera din hai, aur
                main chahta hoon ki tu har second special feel kare. Khush rho,
                haste rho... aur hamesha meri rho. Tu meri zindagi ka sabse pyara
                hissa hai. Love you endlessly ❤️🎂"
              </p>
            </div>
          </div>
          <div className="wish-card">
            <div className="wish-profile">
              <img src="/assets/wish3.jpg" alt="Family 1" />
            </div>
            <div className="wish-content">
              <h3>Me as a classmate</h3>
              <p>
                Happy birthday Shreya! Ab as a classmate isse jada mai nhi
                bolta😂😂
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Starry Night Closing Section */}
      <section id="closing" className="closing">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="closing-content">
          <h2>To my brightest star</h2>
          <p>Thank you for lighting up my world.</p>
          <div className="star-heart" id="starHeart"></div>
        </div>
      </section>

      {/* Easter Eggs */}
      <div className="easter-eggs">
        <div className="hidden-heart" data-message="I love your smile"></div>
        <div className="hidden-heart" data-message="You're my everything"></div>
        <div className="hidden-heart" data-message="Forever and always"></div>
        <div className="hidden-heart" data-message="You're my dream come true"></div>
        <div className="hidden-heart" data-message="My heart is yours"></div>
      </div>

    </>
  );
};

export default HomeView;
