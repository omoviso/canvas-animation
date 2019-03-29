let vueTemplate = {
  aboutMe: `
  <div>
    <h1>About Me</h1>
    <p id="intro"><q><i>You do not always work as what you studied, but just do it</i></q> - My mother's and Nike's combined quote.
    </p>
    <p id="welcome">Welcome to my Portfolio
    </p>
    <p>First, thank you for passing by. Let me briefly introduce myself. My name is Thanh Nguyen Tien. I am a graduated Automation Engineer from HAMK University of Applied Sciences in Valkeakoski city, Finland.
    </p>
    <p>I graduated as an Automation Engineer, but I am looking for jobs that involve with coding using HTML, CSS and Javascript, or Front-end developer. The reason for this shift in work is that I did not know what I liked back when I was in pre-university period and therefore, I listened to my parents' choice. After 5 years in the University, I came to realize that I like coding and figuring out effective ways to do stuff, as well as solving problems - through codes, of course! Because of studying an unrelated field, I have been studying HTML, CSS and Javascript on a daily basis for almost a year so that I can somewhat keep up with those actually graduated from relevant fields. Even though Automation Engineering is not related to what I would like to work as, the time I spent studying it helped me develop better logical thinking. 
    </p>
    <p>As a person who loves coding, I really enjoy it when I can see my products fully displayed in front of me as expected, when I punch through hard walls (figuratively) that make me sleep less soundly for days. I often look for help on stackexchange.com when I meet such walls, and developer.mozilla.org for things whose functions I don't understand. I also have friends who actually studied in this field. They have been giving me their hands on my path I am walking.
    </p>
    <p>I am currently studying Vue and React to keep up with the rest of the developer's world. I implemented what I learned about Vue into this portfolio as first steps of ultilizing it. As of now, I still study Javascript and challenge myself with self-made problems to sharpen my thinking. I always aim for being better by studying harder and learning from other people.
    </p>
  </div>
`,
  personalInfo: `
  <div>
    <h1> Personal Information </h1>
    <ul>
      <li> Full name: Nguyen Tien Thanh.</li>
      <li> Date of Birth: 06/11/1995.</li>
      <li>Phone: 0465601840.</li>
      <li>Address: Harustie 8E55, Helsinki, Finland.</li>
    </ul>
    <h1>Education & Skills</h1>
    <ul>
      <li>Bachelor of Automation Engineering (Sep 2013 - Feb 2019) at HAMK University Of Applied Sciences - GPA: 3.39.</li>
      <li>Self-studying HTML, CSS and Javascript on a daily basis.</li>
      <li>Finished challenges on javascript30.com.</li>
      <li>Completed 17 katas with Javascript on codewars.com.</li>
      <li>Can use Vue and React at a beginner level.</li>
      <li>Know how to use Github.</li>
    </ul>
    <h1>Previous Work Experience</h1>
    <ul>
      <li>Morning paper delivery boy using bikes.</li>
      <li>Restaurant cleaner.</li>
      <li>Internship at a Vietnamese company specialized in solar power named SolarBK.</li>
      <li>Internship at a Russia-Vietnam Joint Venture named Vietsovpetro in Vung Tau city.</li>
    </ul>
  </div>
`
};

Vue.component("tab-about", {
  template: vueTemplate.aboutMe
});

Vue.component("tab-info", {
  template: vueTemplate.personalInfo
});

new Vue({
  el: ".description",
  data: {
    titles: [
      { title: "About Me", content: "about" },
      { title: "Personal Info", content: "info" }
    ],
    currentTab: "about"
  },
  computed: {
    currentTabComponent: function() {
      return `tab-${this.currentTab}`;
    }
  }
});
