    document.addEventListener("DOMContentLoaded", function () {
    const voiceBtn = document.getElementById("voiceBtn");
    const voiceStatus = document.getElementById("voiceStatus");
    const aiInput = document.getElementById("aiInput");
    const aiFeedback = document.getElementById("aiFeedback");
    
    const fromStation = document.getElementById("fromStation");
    const toStation = document.getElementById("toStation");
    const travelDate = document.getElementById("travelDate");
    const hiddenForm = document.getElementById("hiddenBookingForm");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        voiceStatus.innerText = " Speech Recognition not supported in this browser. Please use Chrome.";
        voiceBtn.style.display = "none";
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    voiceBtn.addEventListener("click", function () {
        recognition.start();
        voiceBtn.style.backgroundColor = "#dc2626"; 
        voiceStatus.innerText = "Listening... Speak clearly now.";
        aiFeedback.innerText = "";
    });

    recognition.onresult = function (event) {
        voiceBtn.style.backgroundColor = "#0284c7";
        const spokenText = event.results[0][0].transcript.toLowerCase();
        aiInput.value = event.results[0][0].transcript;
        voiceStatus.innerText = "Voice processing completed!";
        
        
        parseVoiceData(spokenText);
    };

    recognition.onerror = function () {
        voiceBtn.style.backgroundColor = "#0284c7";
        voiceStatus.innerText = " Could not capture voice. Try again.";
    };

    function parseVoiceData(text) {
        const stations = ["riyadh", "dammam", "makkah", "madinah"];
        let departure = "";
        let arrival = "";

        stations.forEach(station => {
            if (text.includes("from " + station)) {
                departure = station;
            } else if (text.includes("to " + station)) {
                arrival = station;
            }
        });

        
        if (!departure || !arrival) {
            let found = [];
            stations.forEach(station => {
                if (text.includes(station)) found.push(station);
            });
            if (found.length >= 1 && !departure) departure = found[0];
            if (found.length >= 2 && !arrival) arrival = found[1];
        }

        
        let targetDate = new Date();
        let dateDetected = false;

        if (text.includes("tomorrow")) {
            targetDate.setDate(targetDate.getDate() + 1);
            dateDetected = true;
        } else if (text.includes("after tomorrow")) {
            targetDate.setDate(targetDate.getDate() + 2);
            dateDetected = true;
        } else if (text.includes("today")) {
            dateDetected = true;
        }

        const formattedDate = targetDate.toISOString().split('T')[0];

       
        if (departure && arrival && departure !== arrival && dateDetected) {
            fromStation.value = departure.charAt(0).toUpperCase() + departure.slice(1);
            toStation.value = arrival.charAt(0).toUpperCase() + arrival.slice(1);
            travelDate.value = formattedDate;

            aiFeedback.innerHTML = ` Successfully recognized! your ticket from ${fromStation.value} to ${toStation.value}`;
            aiFeedback.style.color = "#16a34a";

            setTimeout(() => { hiddenForm.submit(); }, 2500);
        } else {
            aiFeedback.innerHTML = " Try saying: 'From Riyadh to Makkah tomorrow'.";
            aiFeedback.style.color = "#dc2626";
        }
    }
});