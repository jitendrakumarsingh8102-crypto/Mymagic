import React, { useEffect } from 'react';
import '../first_meet.css';

const FirstMeetView = ({ onNavigate }) => {

  useEffect(() => {
    // Global variables matching original JS
    let heartClicked = false;
    let sparkleInterval;

    // --- Media Lightbox Logic ---
    const galleryVideos = document.querySelectorAll(".gallery-video");
    const lightbox = document.getElementById("lightbox");
    const lightboxVideo = document.getElementById("lightbox-video");
    const togglePlay = document.getElementById("togglePlay");
    const toggleMute = document.getElementById("toggleMute");
    const closeLightbox = document.getElementById("closeLightbox");

    if(galleryVideos && lightbox && lightboxVideo) {
      galleryVideos.forEach(video => {
        video.addEventListener("click", () => {
          lightboxVideo.src = video.getAttribute("src");
          lightboxVideo.play().catch(e => console.log(e));
          lightbox.style.display = "flex";
          if(togglePlay) togglePlay.textContent = "Pause";
          if(toggleMute) toggleMute.textContent = lightboxVideo.muted ? "Unmute" : "Mute";
        });
      });
    }

    if(togglePlay && lightboxVideo) {
      togglePlay.addEventListener("click", () => {
        if (lightboxVideo.paused) {
          lightboxVideo.play().catch(e => console.log(e));
          togglePlay.textContent = "Pause";
        } else {
          lightboxVideo.pause();
          togglePlay.textContent = "Play";
        }
      });
    }

    if(toggleMute && lightboxVideo) {
      toggleMute.addEventListener("click", () => {
        lightboxVideo.muted = !lightboxVideo.muted;
        toggleMute.textContent = lightboxVideo.muted ? "Unmute" : "Mute";
      });
    }

    if(closeLightbox && lightbox && lightboxVideo) {
      closeLightbox.addEventListener("click", () => {
        lightboxVideo.pause();
        lightboxVideo.src = "";
        lightbox.style.display = "none";
      });
    }

    // --- Countdown Logic ---
    let countdownInterval;
    function updateCountdown() {
      const firstMeetDate = new Date("2025-07-4");
      const today = new Date();
      const timeDifference = today.getTime() - firstMeetDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

      const counter = document.getElementById("days-counter");
      if (counter) {
        animateCounterTo(counter, daysDifference);
      }
    }

    function animateCounterTo(element, targetValue) {
      let currentCount = 0;
      const increment = Math.ceil(targetValue / 100);
      const duration = 2000; // 2 seconds
      const stepTime = duration / (targetValue / increment);

      const countAnimation = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetValue) {
          currentCount = targetValue;
          clearInterval(countAnimation);
        }
        element.textContent = currentCount.toLocaleString();
      }, stepTime);
    }
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 3600000);

    // --- Heart Easter Egg ---
    function initializeHeartEasterEgg() {
      const heartTrigger = document.getElementById("heart-trigger");
      const hiddenMessage = document.getElementById("hidden-message");
    
      if (heartTrigger && hiddenMessage) {
        // Remove existing listener to prevent duplicates in dev strict mode
        const triggerHandler = function (e) {
          e.preventDefault();
          toggleHeartMessage();
          createSparkleEffect(this);
        };
        heartTrigger.addEventListener("click", triggerHandler);
        
        // Save for cleanup
        heartTrigger._triggerHandler = triggerHandler;
      }
    }

    function toggleHeartMessage() {
      heartClicked = !heartClicked;
      if (heartClicked) {
        showHeartMessage();
      } else {
        hideHeartMessage();
      }
    }

    function showHeartMessage() {
      const hiddenMessage = document.getElementById("hidden-message");
      if (hiddenMessage) {
        hiddenMessage.classList.add("show");
        // Auto-hide after 5 seconds
        setTimeout(hideHeartMessage, 5000);
      }
    }

    function hideHeartMessage() {
      const hiddenMessage = document.getElementById("hidden-message");
      if (hiddenMessage) {
        hiddenMessage.classList.remove("show");
        heartClicked = false;
      }
    }

    // Close message when clicking outside
    const outsideHeartClickHandler = (e) => {
      const heartTrigger = document.getElementById("heart-trigger");
      const hiddenMessage = document.getElementById("hidden-message");
      if (heartTrigger && hiddenMessage) {
        if (!heartTrigger.contains(e.target) && !hiddenMessage.contains(e.target)) {
          hideHeartMessage();
        }
      }
    };
    document.addEventListener("click", outsideHeartClickHandler);

    // --- Sparkles ---
    function createSparkleEffect(element) {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
    
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          createSingleSparkle(centerX, centerY);
        }, i * 100);
      }
    }
    
    function createSingleSparkle(x, y) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.position = "fixed";
      sparkle.style.left = x + (Math.random() - 0.5) * 100 + "px";
      sparkle.style.top = y + (Math.random() - 0.5) * 100 + "px";
      sparkle.style.animationDelay = Math.random() * 2 + "s";
      sparkle.style.zIndex = "1000";
    
      document.body.appendChild(sparkle);
    
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.remove();
        }
      }, 3000);
    }
    
    // --- Scroll Animations ---
    let intersectionObserver;
    function initializeScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };
    
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target;
              element.style.opacity = "1";
              element.style.transform = "translateY(0)";
              element.style.transition = "all 0.8s ease-out";
            }
          });
        },
        observerOptions
      );
    
      const animatedElements = document.querySelectorAll(
        ".animate-fade-in, .animate-slide-up"
      );
      animatedElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        intersectionObserver.observe(element);
      });
    }

    // --- Handlers ---
    function handleScroll() {
      const scrolled = window.pageYOffset;
      // We rely entirely on the CSS 'background-attachment: fixed' for the parallax
      // because translating the entire container causes it to overlap the content below.
      
      const scrollIndicator = document.querySelector(".scroll-indicator");
      if (scrollIndicator) {
        if (scrolled > 100) {
          scrollIndicator.style.opacity = "0";
        } else {
          scrollIndicator.style.opacity = "1";
        }
      }
    }

    // --- Floating Elements ---
    let floatHeartInterval;
    let floatSparkleInterval;
    function initializeFloatingElements() {
      floatHeartInterval = setInterval(() => {
        if (Math.random() > 0.6) {
          const heart = document.createElement("div");
          const hearts = ["💕", "💖", "💗", "💝", "💘"];
          heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
          heart.className = "floating-heart";
          heart.style.left = Math.random() * 100 + "%";
          heart.style.top = "100vh";
          heart.style.fontSize = Math.random() * 1 + 0.8 + "rem";
          heart.style.animationDuration = Math.random() * 3 + 4 + "s";
          heart.style.zIndex = "1";
      
          document.body.appendChild(heart);
      
          // Animate upward
          setTimeout(() => {
            heart.style.top = "-10vh";
          }, 100);
      
          setTimeout(() => {
            if (heart.parentNode) {
              heart.remove();
            }
          }, 8000);
        }
      }, 8000);
    
      floatSparkleInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          const sparkle = document.createElement("div");
          sparkle.className = "sparkle";
          sparkle.style.position = "fixed";
          sparkle.style.left = Math.random() * 100 + "%";
          sparkle.style.top = Math.random() * 100 + "%";
          sparkle.style.animationDelay = Math.random() * 2 + "s";
          sparkle.style.zIndex = "1";
      
          document.body.appendChild(sparkle);
      
          setTimeout(() => {
            if (sparkle.parentNode) {
              sparkle.remove();
            }
          }, 3000);
        }
      }, 5000);
    }

    // --- Init Calls ---
    initializeHeartEasterEgg();
    initializeScrollAnimations();
    initializeFloatingElements();

    function throttle(func, limit) {
      let inThrottle;
      return function () {
        const args = arguments;
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    }
    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener("scroll", throttledScroll);

    function handleResize() {
      if (window.innerWidth <= 768) {
        const hiddenMessage = document.getElementById("hidden-message");
        if (hiddenMessage && hiddenMessage.classList.contains("show")) {
          hiddenMessage.style.position = "fixed";
          hiddenMessage.style.top = "50%";
          hiddenMessage.style.left = "50%";
          hiddenMessage.style.transform = "translate(-50%, -50%)";
        }
      }
    }
    window.addEventListener("resize", handleResize);

    // --- Polaroid Hover ---
    const polaroids = document.querySelectorAll(".polaroid");
    const polaroidEnter = function () { this.style.zIndex = "10"; };
    const polaroidLeave = function () { this.style.zIndex = "1"; };
    polaroids.forEach((polaroid) => {
      polaroid.addEventListener("mouseenter", polaroidEnter);
      polaroid.addEventListener("mouseleave", polaroidLeave);
    });

    if ("ontouchstart" in window) {
      polaroids.forEach((polaroid) => {
        polaroid.addEventListener("touchstart", function () {
          this.classList.add("touched");
          setTimeout(() => {
            this.classList.remove("touched");
          }, 2000);
        }, { passive: true });
      });
    }

    // Cleanup phase
    return () => {
      clearInterval(countdownInterval);
      clearInterval(floatHeartInterval);
      clearInterval(floatSparkleInterval);
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", outsideHeartClickHandler);
      if(intersectionObserver) intersectionObserver.disconnect();
      polaroids.forEach((polaroid) => {
        polaroid.removeEventListener("mouseenter", polaroidEnter);
        polaroid.removeEventListener("mouseleave", polaroidLeave);
      });
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-soft-ivory via-blush-beige to-rose-mist font-poppins overflow-x-hidden relative min-h-screen first-meet-wrapper">
      {/* Navigation */}
      <nav className="navigation">
        <ul>
          <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a></li>
        </ul>
      </nav>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="sparkle" style={{top: '10%', left: '20%', animationDelay: '0s'}}></div>
        <div className="sparkle" style={{top: '30%', left: '80%', animationDelay: '1s'}}></div>
        <div className="sparkle" style={{top: '60%', left: '15%', animationDelay: '2s'}}></div>
        <div className="sparkle" style={{top: '80%', left: '70%', animationDelay: '0.5s'}}></div>
        <div className="sparkle" style={{top: '20%', left: '60%', animationDelay: '1.5s'}}></div>

        <div className="floating-heart" style={{top: '15%', left: '10%', animationDelay: '0s'}}>💕</div>
        <div className="floating-heart" style={{top: '40%', left: '85%', animationDelay: '2s'}}>💖</div>
        <div className="floating-heart" style={{top: '70%', left: '5%', animationDelay: '4s'}}>💗</div>
        <div className="floating-heart" style={{top: '25%', left: '75%', animationDelay: '3s'}}>💝</div>
      </div>

      {/* Hero Banner Section */}
      <section className="hero-section relative min-h-screen flex flex-col items-center justify-center parallax-bg w-full overflow-hidden">
        <video 
          src="/assets/together.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-white/20 z-0"></div>
        <div className="text-center z-10 px-4 animate-fade-in w-full relative">
          <h1 className="font-great-vibes text-6xl md:text-8xl text-gray-900 mb-6 text-shadow-soft">
            The Day We Met
          </h1>
          <div className="scroll-indicator mt-8">
            <div className="w-6 h-10 border-2 border-dusty-rose rounded-full mx-auto flex justify-center">
              <div className="w-1 h-3 bg-dusty-rose rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Since First Meet */}
      <section className="py-20 px-4 bg-gradient-to-r from-blush-beige to-soft-ivory relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="font-great-vibes text-5xl text-warm-gold mb-8">
            Time Since Magic Began
          </h2>
          <div className="glass-effect p-8 rounded-2xl inline-block">
            <div
              id="days-counter"
              className="countdown-number text-6xl font-bold text-dusty-rose mb-4"
            >
              0
            </div>
            <p className="font-lora text-xl text-gray-700">
              Beautiful days since I first saw you
            </p>
            <p className="font-dancing text-lg text-faded-peach mt-4">
              And counting... 💕
            </p>
          </div>
        </div>
      </section>

      {/* Hovering Polaroid Gallery */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="font-great-vibes text-5xl text-center text-warm-gold mb-16">
            Captured Moments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memoery1_fm.jpg" alt="Memory 1" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_2.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_3.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_4.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_5.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_6.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_7.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_8.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_9.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_10.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_11.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_12.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_13.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_14.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_15.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_16.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_17.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/memory_fm_18.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/back_groung_fm.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
            <div className="polaroid relative cursor-pointer">
              <img src="/assets/background_fm.jpg" alt="Memory" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Memory Snapshot Section */}
      <section className="py-20 px-4 relative z-10 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative animate-slide-up mx-auto w-full">
              <img
                src="/assets/back_groung_fm.jpg"
                alt="Our First Meeting"
                className="memory-photo w-full rounded-lg shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300 object-cover"
              />
              <div
                className="memory-note absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg transform rotate-3 font-dancing text-dusty-rose text-lg"
              >
                "That magical moment ✨"
              </div>
            </div>
            <div className="space-y-8 animate-fade-in">
              <div className="glass-effect p-6 rounded-lg w-full">
                <h3 className="font-dancing text-3xl text-dusty-rose mb-4">
                  July 4, 2025
                </h3>
                <p className="font-lora text-gray-700 text-lg leading-relaxed">
                  The little café on Municipility chawk, where time stood still
                  and everything changed forever.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-lg w-full">
                <h3 className="font-dancing text-2xl text-warm-gold mb-4">
                  First Thoughts
                </h3>
                <p className="font-lora text-gray-700 italic text-lg leading-relaxed">
                  "Jada likha nhi jaa rha hai par dekh ke yakin hogya tha ki ab
                  bas yhi hai."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="video-gallery w-full z-10 relative">
        <h2 className="font-great-vibes text-5xl mb-12">Our Memories in Motion</h2>
        <div className="video-grid">
          <video src="/assets/video1.mp4" className="gallery-video" data-index="0" loop></video>
          <video src="/assets/video2.mp4" className="gallery-video" data-index="1" loop></video>
          <video src="/assets/video3.mp4" className="gallery-video" data-index="2" loop></video>
          <video src="/assets/video4.mp4" className="gallery-video" data-index="3" loop></video>
          <video src="/assets/video5.mp4" className="gallery-video" data-index="4" loop></video>
          <video src="/assets/video6.mp4" className="gallery-video" data-index="5" loop></video>
          <video src="/assets/video7.mp4" className="gallery-video" data-index="6" loop></video>
          <video src="/assets/together.mp4" className="gallery-video" data-index="7" loop></video>
        </div>
      </section>

      <section className="youtube-gallery w-full z-10 relative">
        <h2 className="font-great-vibes text-5xl mb-12">Special Moments on YouTube</h2>
        <div className="youtube-grid">
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/56KKUz5BmD4" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/XWEoIzgldas" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/wY4H9liJiUs" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/rneMb2-C4vY" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/mLTBWsFr7FY" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/HcNZtnUs-7E" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/Y_47mnroOyE" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/6R930aDp54I" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/sgq93RNXqh8" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/dzuQzbgYyIE" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/WxsjSs9csrQ" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/Sh5f5gIvw9w" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/m2-lGGf52O8" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/TP3FSjUB9iQ" allowFullScreen></iframe></div>
          <div className="youtube-video"><iframe src="https://www.youtube.com/embed/RtjPv1lcNi0" allowFullScreen></iframe></div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      <div id="lightbox" className="lightbox">
        <div className="lightbox-content">
          <video id="lightbox-video" controls></video>
          <div className="lightbox-controls">
            <button id="togglePlay">Pause</button>
            <button id="toggleMute">Mute</button>
            <button id="closeLightbox">Close</button>
          </div>
        </div>
      </div>

      {/* Clickable Heart Easter Egg */}
      <section className="py-20 px-4 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="relative inline-block w-full">
            <div
              id="heart-trigger"
              className="heart-trigger text-6xl cursor-pointer animate-heart-beat hover:scale-110 transition-transform duration-300"
            >
              Hit me hard 🥊
            </div>
            <div
              id="hidden-message"
              className="hidden-message absolute top-20 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-xl border-2 border-dusty-rose"
            >
              <p className="font-dancing text-2xl text-dusty-rose">"I love you"</p>
              <p className="font-dancing text-2xl text-dusty-rose">
                "my cutiepie...cookie 💕"
              </p>
              <div
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-dusty-rose rotate-45"
              ></div>
            </div>
          </div>
          <p className="font-lora text-gray-600 mt-8 text-lg">
            A hit button for my angry bird
          </p>
        </div>
      </section>

      {/* Final Message */}
      <section className="py-20 px-4 w-full">
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="glass-effect p-12 rounded-2xl w-full">
            <h3 className="font-great-vibes text-4xl text-warm-gold mb-6">
              Every Love Story is Beautiful...
            </h3>
            <p className="font-lora text-xl text-gray-700 leading-relaxed">
              But ours is my favorite. From that first glance to this very moment,
              you've been the most beautiful chapter of my life.
            </p>
            <div className="mt-8 text-4xl">💕✨💖</div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FirstMeetView;
