window.addEventListener("load", () => {
    for (let el of document.querySelectorAll(".typewriter-word")) {
      // Get both delay and initial delay, both greater than or equal to zero
      let delay = parseInt(el.getAttribute("data-delay"));
      if (isNaN(delay) || delay < 0) delay = 400; // Default value == 500
      let initDelay = parseInt(el.getAttribute("data-initial-delay"));
      if (isNaN(initDelay) || initDelay < 0) initDelay = delay; // Default value == 'delay'
      
      // Save words in array, where words are Strings seperated by " "
      let words = [];
      for (let word of el.innerHTML.split(" "))
        words.push(word);
      
      // Remove content of element
      el.innerHTML = "";
      
      let intervalId; // Variable to save the interval's ID,
                      // to remove interval when finished adding all words
      setTimeout(() => {
        function nextWord() {
          if (words.length <= 0) { // When all words are "printed", clear interval
            clearInterval(intervalId);
            return;
          }
          el.innerHTML += " " + words.shift(); // FIFO via 'Array.shift()' -> No index-usage required!
        }
        
        nextWord(); // Call once -before setInterval()- since setInterval starts firing only after its delay
        intervalId = setInterval(nextWord, delay); // Save interval's ID in variable for removing it when finished
      }, initDelay); // setTimeout(func, initDelay) --> Starting after initial delay
    }
  });