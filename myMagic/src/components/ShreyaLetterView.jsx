import React, { useState } from 'react';

const letterData = {
  S: {
    word: "Sukoon",
    story: [
      "Sach bolu toh pehle zindagi bas chal rahi thi, koi khaas wajah nahi thi.",
      "Shayad tabhi tum aayi… aur sab kuch dheere dheere theek sa lagne laga.",
      "Socha nahi tha ki kisi ke saath chup rehna bhi itna acha lag sakta hai.",
      "Saath tumhara ho toh ajeeb si shanti milti hai, bina kisi reason ke."
    ],
    message: "Tum ho toh sab thoda manageable lagta hai… warna main itna strong bhi nahi hoon.",
    quote: "Sukoon koi jagah nahi hoti, shayad ek insaan hota hai… aur mere liye wo tum ho."
  },

  H: {
    word: "Hamsafar",
    story: [
      "Har din perfect nahi hota mera, par tum ho toh thoda better ho jata hai.",
      "Hasi aati hai jab sochta hoon ki pehle main sab kuch akela handle karta tha.",
      "Hamesha strong rehna possible nahi hota, par tumhare saamne weak hona safe lagta hai.",
      "Haq se bol sakta hoon, tum mere saath ho toh dar kam lagta hai."
    ],
    message: "Mujhe nahi pata main kitna acha hoon… par tumhare saath rehna chahta hoon, bas itna pakka hai.",
    quote: "Humsafar wo nahi jo sirf khushiyon mein ho… balki wo jo tumhe samjhe bina zyada bole."
  },

  R: {
    word: "Roohaniyat",
    story: [
      "Raat ko kabhi kabhi bina wajah tum yaad aati ho.",
      "Random si cheezein bhi tumse connect ho jaati hain ab.",
      "Ruk ruk ke hi sahi, par main express karna seekh raha hoon tumhare liye.",
      "Rishta kya naam du isse pata nahi… par important bahut hai."
    ],
    message: "Tum sirf pasand nahi ho… tum zarurat jaisi ho gayi ho.",
    quote: "Rishta shayad simple hai… par feel bahut deep hai."
  },

  E: {
    word: "Ehsaas",
    story: [
      "Ek message tumhara aur mood automatically thoda better ho jata hai.",
      "Ekdum se yaad aa jaati ho din ke beech mein bhi.",
      "Effort karta hoon ki tumhe kabhi hurt na karu… par perfect nahi hoon.",
      "Ehsaas ye hai ki tum important ho… baaki sab baad mein."
    ],
    message: "Tumhari presence hi kaafi hoti hai kabhi kabhi, kuch extra chahiye hi nahi hota.",
    quote: "Ehsaas samjhane wale nahi hote… bas feel hote hain."
  },

  Y: {
    word: "Yakeen",
    story: [
      "Yakeen pehle itna easily nahi aata tha mujhe.",
      "Ya shayad main hi overthink karta tha har cheez.",
      "Yeh jo tum ho na… tumhare saath thoda trust natural lagta hai.",
      "Yeh feeling new hai, par acchi hai."
    ],
    message: "Mujhe nahi pata future kya hai… par tum par trust karna acha lagta hai.",
    quote: "Yakeen force nahi hota… dheere dheere ho jata hai."
  },

  A: {
    word: "Aashiqui",
    story: [
      "Aise hi casually start hua tha sab… par ab casual nahi raha.",
      "Aadat si ho gayi hai tumse baat karne ki.",
      "Ajeeb hai thoda, par tumhari importance samajh aa rahi hai mujhe.",
      "Aur shayad main itna bol nahi pata jitna feel karta hoon."
    ],
    message: "Main perfect nahi hoon… par jo bhi hoon, tumhare liye real hoon.",
    quote: "Aashiqui shayad badi cheez nahi hoti… choti choti cheezon mein hoti hai."
  }
};

const ShreyaLetterView = ({ onNavigate }) => {
  const [activeLetter, setActiveLetter] = useState('S');
  const [fade, setFade] = useState('diary-page-forward-in');
  const bgContainerRef = React.useRef(null);
  const audioCtxRef = React.useRef(null);
  
  React.useEffect(() => {
    if (!audioCtxRef.current && (window.AudioContext || window.webkitAudioContext)) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const heartContainer = bgContainerRef.current;
    if (!heartContainer) return;

    for (let i = 0; i < 35; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${15 + Math.random() * 10}s`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      heartContainer.appendChild(heart);
    }

    const messages = [
  "I love you",
  "You are mine",
  "My safe place",
  "Tum meri ho",
  "Only you matter",
  "You feel home",
  "Mera sukoon tum",
  "Always with you",
  "You and me",
  "Forever with you",
  "I love you",
  "I love you",
  "I love you",
  "I love you",
  "I love you",
  "I love you",
  "I love you",
  "I love you",
  "I love you",
  "You complete me"
];

    const triggerRain = () => {
      const rainContainer = document.createElement("div");
      rainContainer.style.position = "fixed";
      rainContainer.style.inset = "0";
      rainContainer.style.pointerEvents = "none";
      rainContainer.style.zIndex = "9999";
      document.body.appendChild(rainContainer);

      const items = [
  "❤️",
  "💖",
  "💕",
  "💞",
  "💐",
  "✨",
  "💫"
];
      for (let i = 0; i < 20; i++) {
        const drop = document.createElement("div");
        drop.textContent = items[Math.floor(Math.random() * items.length)];
        drop.style.position = "absolute";
        drop.style.fontSize = `${Math.random() * 15 + 20}px`;
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.top = "-50px";
        drop.style.opacity = Math.random() * 0.5 + 0.5;
        rainContainer.appendChild(drop);

        drop.animate(
          [
            { transform: "translateY(0) rotate(0deg)" },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)` }
          ],
          {
            duration: (Math.random() * 3 + 2.5) * 1000,
            easing: "linear",
            fill: "forwards"
          }
        );
      }
      setTimeout(() => {
        if (document.body.contains(rainContainer)) rainContainer.remove();
      }, 6000);
    };

    const playPopSound = () => {
      try {
        const audioCtx = audioCtxRef.current;
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') {
           audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // A cute, soft pop sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.1);
      } catch (e) {}
    };

    const bubbleColors = [
      { bg: "rgba(247, 202, 201, 0.15)", shadow: "rgba(247, 202, 201, 0.3)" }, // blush pink
      { bg: "rgba(216, 194, 231, 0.15)", shadow: "rgba(216, 194, 231, 0.3)" }, // lavender
      { bg: "rgba(212, 175, 55, 0.15)", shadow: "rgba(212, 175, 55, 0.3)" },   // soft gold
      { bg: "rgba(255, 255, 255, 0.1)", shadow: "rgba(255, 255, 255, 0.3)" },  // pure white
      { bg: "rgba(189, 140, 125, 0.15)", shadow: "rgba(189, 140, 125, 0.3)" }  // rose gold
    ];

    const createInteractiveBubble = () => {
      const bubble = document.createElement("div");
      bubble.classList.add("interactive-bubble");
      
      const size = Math.random() * 40 + 50; 
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 90 + 5}%`;
      bubble.style.bottom = `-100px`;
      
      const colorProfile = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
      bubble.style.background = colorProfile.bg;
      bubble.style.boxShadow = `inset 0 0 10px rgba(255,255,255,0.1), 0 0 15px ${colorProfile.shadow}, 0 0 5px ${colorProfile.shadow}`;
      
      const dur = Math.random() * 15 + 15;
      bubble.style.animationDuration = `${dur}s`;
      
      let isPopped = false;
      
      const popBubble = () => {
        if(isPopped) return;
        isPopped = true;
        
        playPopSound();
        
        bubble.style.transform = "scale(1.5)";
        bubble.style.opacity = "0";
        
        const textTag = document.createElement("div");
        textTag.textContent = messages[Math.floor(Math.random() * messages.length)];
        textTag.className = "popped-message";
        
        const rect = bubble.getBoundingClientRect();
        // Fallback to absolute positioning if rect gives negative/offscreen top
        const centerX = rect.left + rect.width / 2;
        const centerY = Math.max(50, rect.top + rect.height / 2);
        
        textTag.style.left = `${centerX}px`;
        textTag.style.top = `${centerY}px`;
        
        document.body.appendChild(textTag);
        
        setTimeout(() => { if(document.body.contains(textTag)) textTag.remove(); }, 2500);
        
        triggerRain();
      };
      
      bubble.onclick = popBubble;

      heartContainer.appendChild(bubble);
      
      // Auto burst for 1 out of 5 bubbles near the top of the screen (at 90% of duration)
      if (Math.random() < 0.10) {
        setTimeout(() => {
          if (!isPopped && heartContainer.contains(bubble)) {
            popBubble();
          }
        }, dur * 0.90 * 1000);
      }
      
      setTimeout(() => {
        if (heartContainer.contains(bubble)) bubble.remove();
      }, dur * 1000);
    };

    const bubbleInterval = setInterval(createInteractiveBubble, 1800);

    return () => clearInterval(bubbleInterval);
  }, []);

  const handleLetterClick = (letter) => {
    if (letter === activeLetter) return;
    
    const lettersOrder = ['S', 'H', 'R', 'E', 'Y', 'A'];
    const currentIndex = lettersOrder.indexOf(activeLetter);
    const targetIndex = lettersOrder.indexOf(letter);
    const isForward = targetIndex > currentIndex;

    setFade(isForward ? 'diary-page-forward-out' : 'diary-page-backward-out');
    
    setTimeout(() => {
      setActiveLetter(letter);
      setFade(isForward ? 'diary-page-forward-in' : 'diary-page-backward-in');
    }, 450);
  };

  const letters = ['S', 'H', 'R', 'E', 'Y', 'A'];
  const currentData = letterData[activeLetter];

  return (
    <div 
      className="min-h-screen relative overflow-x-hidden font-poppins selection:bg-[var(--blush-pink)] selection:text-[var(--dark-text)]"
      style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("/placeholder.svg?height=1080&width=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        perspective: '1500px'
      }}
    >
      <div className="floating-hearts pointer-events-none" ref={bgContainerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}></div>

      {/* Top Navigation */}
      <div className="absolute top-0 w-full p-6 z-20 flex justify-between items-center">
        <button 
          onClick={onNavigate} 
          className="px-5 py-2.5 rounded-full border border-[var(--rose-gold)] text-white bg-black/30 backdrop-blur-sm hover:bg-[var(--rose-gold)] hover:text-white transition-all shadow-sm font-medium focus:outline-none"
        >
          ❮ Return Home
        </button>
      </div>

      <div className="z-10 w-full max-w-5xl px-6 flex flex-col md:flex-row min-h-screen items-center justify-center gap-12 md:gap-24 pt-20 pb-10" style={{ perspective: '1500px' }}>
        
        {/* Left/Top Sidebar - Letter Navigation */}
        <div className="flex md:flex-col gap-4 md:gap-6 z-20 overflow-x-auto max-w-full pb-4 md:pb-0 px-2 shrink-0">
          {letters.map((char) => (
            <button
              key={char}
              onClick={() => handleLetterClick(char)}
              className={`text-2xl md:text-3xl font-['Great_Vibes'] transition-all duration-300 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border shrink-0 backdrop-blur-sm
                ${activeLetter === char 
                  ? 'border-[var(--rose-gold)] bg-[var(--rose-gold)] text-white shadow-lg scale-110 drop-shadow-md' 
                  : 'bg-black/20 border-white/20 text-white/70 hover:text-[var(--rose-gold)] hover:border-[var(--rose-gold)] shadow-sm'
                }`}
            >
              {char}
            </button>
          ))}
        </div>

        {/* Right/Bottom Content Area */}
        <div className={`flex-1 flex flex-col justify-center max-w-xl transition-all duration-500 ease-in-out w-full ${fade} transform-style-3d`}>
          
          <h1 className="text-7xl md:text-[9rem] text-[var(--soft-gold)] font-['Great_Vibes'] drop-shadow-xl mb-4 leading-none">
            {activeLetter}
          </h1>
          
          <div className="flex items-baseline gap-4 mb-10 border-b border-white/30 pb-4">
            <h2 className="text-4xl md:text-6xl text-white font-bold tracking-widest font-sans drop-shadow-xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              {currentData.word}
            </h2>
            <span className="text-[var(--soft-gold)] text-xl md:text-2xl font-medium italic drop-shadow-md">
              {currentData.meaning}
            </span>
          </div>

          {/* Story Container */}
          <div className="space-y-5 mb-14 pl-6 border-l-4 border-[var(--rose-gold)] relative">
             {/* Decorative Quotes Icon */}
             <span className="text-7xl text-[var(--soft-gold)] font-['Great_Vibes'] absolute -top-8 -left-6 opacity-60 select-none">"</span>
            {currentData.story.map((line, index) => (
              <p 
                key={activeLetter + index} 
                className="text-white text-[1.2rem] md:text-xl leading-relaxed font-poppins font-medium hover:text-[var(--blush-pink)] transition-colors drop-shadow-lg"
                style={{ 
                  animation: `fadeIn 0.8s ease-out ${index * 0.25}s forwards`, opacity: 0,
                  textShadow: '1px 1px 3px rgba(0,0,0,0.9)'
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="bg-black/50 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/30 text-center mb-10 relative mt-4">
             <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-transparent text-[var(--soft-gold)] text-3xl drop-shadow-lg">✦</span>
            <p className="text-[var(--blush-pink)] font-serif italic font-medium text-2xl md:text-[1.75rem] leading-relaxed drop-shadow-xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              {currentData.message}
            </p>
          </div>

          <p className="text-center text-[var(--soft-gold)] font-serif italic uppercase text-xs md:text-[0.95rem] tracking-[0.25em] font-bold drop-shadow-lg mt-auto">
            "{currentData.quote}"
          </p>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .diary-page-forward-out {
           transform-origin: left center;
           animation: turnPageForwardOut 0.45s ease-in forwards;
        }
        .diary-page-forward-in {
           transform-origin: left center;
           animation: dropPageForwardIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .diary-page-backward-out {
           transform-origin: left center;
           animation: turnPageBackwardOut 0.45s ease-in forwards;
        }
        .diary-page-backward-in {
           transform-origin: left center;
           animation: dropPageBackwardIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes turnPageForwardOut {
           0% { transform: rotateY(0deg); opacity: 1; }
           50% { opacity: 0.8; }
           100% { transform: rotateY(-90deg); opacity: 0; }
        }

        @keyframes dropPageForwardIn {
           0% { transform: rotateY(30deg) translateZ(50px); opacity: 0; }
           100% { transform: rotateY(0deg) translateZ(0); opacity: 1; }
        }

        @keyframes turnPageBackwardOut {
           0% { transform: rotateY(0deg); opacity: 1; }
           50% { opacity: 0.8; }
           100% { transform: rotateY(90deg); opacity: 0; }
        }

        @keyframes dropPageBackwardIn {
           0% { transform: rotateY(-30deg) translateZ(50px); opacity: 0; }
           100% { transform: rotateY(0deg) translateZ(0); opacity: 1; }
        }
        
        /* Hide scrollbar for mobile letter nav */
        div::-webkit-scrollbar {
          display: none;
        }
        div {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .interactive-bubble {
          position: absolute;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          box-shadow: inset 0 0 10px rgba(255,255,255,0.1), 0 0 15px rgba(255,255,255,0.05);
          cursor: pointer;
          animation-name: floatBubble;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          transition: transform 0.2s ease-out, opacity 0.2s ease-out;
          pointer-events: auto;
        }
        
        @keyframes floatBubble {
          0% { transform: translateY(0) scale(1) translateX(0); }
          33% { transform: translateY(-40vh) scale(1.05) translateX(20px); }
          66% { transform: translateY(-80vh) scale(0.95) translateX(-20px); }
          100% { transform: translateY(-130vh) scale(1) translateX(0); }
        }

        .popped-message {
          position: fixed;
          transform: translate(-50%, -50%) scale(0.5);
          color: #f7cac9;
          font-family: 'Great Vibes', cursive;
          font-size: 2.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
          pointer-events: none;
          animation: popMessage 2.5s ease-out forwards;
          z-index: 9999;
          white-space: nowrap;
          text-align: center;
        }

        @keyframes popMessage {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
          40% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          80% { opacity: 1; transform: translate(-50%, -50%) scale(1) translateY(-20px); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9) translateY(-40px); }
        }
      `}} />
    </div>
  );
};

export default ShreyaLetterView;
