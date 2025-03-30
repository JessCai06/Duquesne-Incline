function validate() {
    const nameInput = document.getElementById("name_input_contact");
    const emailInput = document.getElementById("email_input_contact");
    const messageDisplay = document.getElementById("validate_message");

    if (nameInput && emailInput) {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (name !== "" && email !== "") {
            messageDisplay.innerHTML = "Your form was successfully submitted";
            messageDisplay.style.color = "black";

            // Open user's email client with a pre-filled mailto:
            const subject = encodeURIComponent("Contact from " + name);
            const body = encodeURIComponent("Hi Duquesne Incline,\n\nMy name is " + name + ". I can be reached at " + email + ".");
            const mailtoURL = `mailto:duq.incline@duquesneincline.org?subject=${subject}&body=${body}`;

            window.location.href = mailtoURL; // open in current tab
        } else {
            messageDisplay.innerHTML = "Please fill out both your name and email.";
            messageDisplay.style.color = "red";
        }
    }
}



    function toggleSection(button) {
        const $btn = $(button);
        const $content = $btn.closest('.row-header').next('.content');
        $content.slideToggle(300);
        $btn.toggleClass('rotated');
    }


    const images_visitor = [
        "../static/visitor slides/slide1.jpg",
        "../static/visitor slides/slide2.jpg",
        "../static/visitor slides/slide3.jpg",
        "../static/visitor slides/slide4.jpg",
        "../static/visitor slides/slide5.jpg",
    ];

    let currentIndex_visitor = 1;

    function showSlide_v(index) {
        const img = document.getElementById("carousel-image");
        currentIndex_visitor = (index + images_visitor.length) % images_visitor.length;
        img.src = images_visitor[currentIndex_visitor];
    }

    function nextSlide_v() {
        showSlide_v(currentIndex_visitor + 1);
    }

    function prevSlide_v() {
        showSlide_v(currentIndex_visitor - 1);
    }

    const images_gift = [
        "../static/gift slides/slide1.jpg",
        "../static/gift slides/slide2.jpg",
        "../static/gift slides/slide3.jpg",
        "../static/gift slides/slide4.jpg",
    ];

    let currentIndex_gift = 0;

    function showSlide_g(index) {
        const img = document.getElementById("carousel-image-gift");
        currentIndex_gift = (index + images_gift.length) % images_gift.length;
        img.src = images_gift[currentIndex_gift];
    }

    function nextSlide_g() {
        showSlide_g(currentIndex_gift + 1);
    }

    function prevSlide_g() {
        showSlide_g(currentIndex_gift - 1);
    }

    const apiKey = 'gsDGRG8jol7sYJgMhWuQXrKJ5J2yGjba';
    const lat = 40.4399;
    const lon = -80.0176;

    async function fetchLocationKey() {
      const geoUrl = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`;
      const response = await fetch(geoUrl);
      const data = await response.json();
      return data.Key;
    }

    async function fetchWeather() {
      try {
        const locationKey = await fetchLocationKey();
        const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
        const response = await fetch(weatherUrl);
        const data = await response.json();

        const temperature = data[0].Temperature.Imperial.Value;
        const unit = data[0].Temperature.Imperial.Unit;
        const description = data[0].WeatherText;

        document.getElementById("weather-info").innerHTML =
          `It's currently <strong>${temperature}°${unit}</strong> and <strong>${description}</strong> at the Duquesne Incline.`;
      } catch (error) {
        document.getElementById("weather-info").textContent =
          'Unable to fetch weather data. Please try again later.';
        console.error(error);
      }
    }

    fetchWeather();

