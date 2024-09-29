<template>
  <section class="main-section">
    <div class="inner-section">
      <div class="profile">
        <RoundPicture imageLink="me.jpg" altText="Profile picture of me" />
        <div class="emojis">
          <span>🔐</span>
          <span>💻</span>
          <span>🎮</span>
        </div>
      </div>
      <div>
        <h1 tabindex="-1" id="about-me" class="animate-text">
          <span>Hello there,</span> <span>I'm&nbsp;Homa.</span>
        </h1>
        <p>
          I am a student from Tashkent, currently studying in my fourth year in the field of I
          nformation Security.
        </p>
        <p>
          At the moment, I am focusing on studying penetration testing, which I believe is one of
          the most exciting and important areas in cybersecurity.
        </p>
        <p>
          My specialization is web development. I am studying the basics of cybersecurity and
          pentesting, and I strive to apply my knowledge in practice. I have experience working with
          various web technologies and continue to learn new frameworks and tools to improve my
          skills.
        </p>
        <p>
          In my free time, I engage in many interesting activities. I love playing video games,
          which allows me to develop strategic thinking and tactical skills. In the evenings, I
          often sit down to watch movies or series to relax and enjoy good stories.
        </p>
        <p>
          I am always open to new acquaintances and opportunities, so I look forward to
          communicating and collaborating with like-minded individuals!
        </p>
      </div>
    </div>
  </section>
  <section>
    <div class="inner-section">
      <ExpandableSection title="Developer tools">
        <p>HTML, CSS, SCSS, JavaScript, Vue, Node.js, WordPress, Git.</p>
      </ExpandableSection>
      <ExpandableSection title="UX/UI tools">
        <p>Figma (Adobe XD, Sketch), Adobe Photoshop/Illustrator/InDesign.</p>
      </ExpandableSection>
      <ExpandableSection title="Experience">
        <div>
          <div class="content">
            <h4>Idea Company</h4>
            <small class="date">January 2022 - January 2023 (1 year 1 month)</small>
            <p class="small">
              Position: Graphic Designer. Created logos, advertising banners, and social media
              content while collaborating with clients to meet their needs.
              <br /><br />
              Achievements: Designed over 20 logos for startups, boosting their market recognition.
              Developed banners for campaigns, increasing engagement by 30%, and created content
              that grew followers by 15%.
            </p>
          </div>
          <div class="content">
            <h4>TNT</h4>
            <small class="date">March 2023 - February 2024 (12 months)</small>
            <p class="small">
              Position: Logistics Department. Handled accounting, auditing, and data management.
              <br /><br />
              Achievements: Developed an interactive Google Sheets board that automated
              calculations, reducing processing time by 30% and enhancing reporting accuracy.
            </p>
          </div>
          <div class="content">
            <h4>FL.ru</h4>
            <small class="date">April 2024 - August 2024 (5 months)</small>
            <p class="small">
              Position: Freelance Web Developer. Created websites, focusing on usability and SEO
              optimization.
              <br /><br />
              Achievements: Increased organic traffic by 25% through SEO optimization and improved
              conversion rates by 15% with enhanced user interfaces.
            </p>
          </div>
        </div>
      </ExpandableSection>

      <ExpandableSection title="Education">
        <div class="small-text">
          <div class="content">
            <h4>Tashkent University of Information Technologies</h4>
            <small class="date">2020 - 2025</small>
            <p class="small">
              Bachelor's degree in Cybersecurity. Specialization in Information Security.
            </p>
          </div>
          <div class="content">
            <h4>ProWeb Programming Course</h4>
            <small class="date">May 2023 - March 2024</small>
            <p class="small">
              A 10-month program focused on modern programming techniques and web development.
            </p>
          </div>
          <div class="content">
            <h4>Creative Design Course</h4>
            <small class="date">September 2021 - March 2022</small>
            <p class="small">Six-month course covering the fundamentals of design and software. Studied Photoshop and Illustrator.</p>
          </div>
        </div>
      </ExpandableSection>
    </div>
  </section>
  <section>
    <div class="inner-section">
      <h2>Socials</h2>
      <p>Feel free to reach out to me on social media.</p>
      <div class="links">
        <ExternalLink title="Telegram" link="https://t.me/Who_Homa" />
        <ExternalLink title="Github" link="https://github.com/duvan094" />
      </div>
    </div>
  </section>
</template>

<script setup>
import ExternalLink from '../components/ExternalLink.vue'
import ExpandableSection from '../components/ExpandableSection.vue'
import RoundPicture from '../components/RoundPicture.vue'
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.main-section {
  padding-top: 6rem;
}

.animate-text {
  span {
    display: inline-block;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    will-change: transform, opacity;
  }
  @for $i from 0 through 10 {
    span:nth-child(#{$i + 1}) {
      opacity: 0;
      transform: translateY(3rem);
      animation: 1s ease reveal calc($i * 1s + 0.5s);
      animation-fill-mode: forwards;
    }
  }

  @keyframes reveal {
    0% {
      opacity: 0;
      transform: translateY(1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.links {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 720px) {
    flex-direction: row;
    gap: 2rem;
  }
}

.content {
  padding: 0 0.5rem 1rem 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border-expandable-content);

  &:last-child {
    margin-bottom: 1rem;
    border-bottom: none;
  }
}

.content small {
  display: inline-block;
  font-size: 1em;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.content .date {
  margin-bottom: 1rem;
}

.content h4 {
  margin-bottom: 0;
}

.content p.small {
  font-size: 1em;
}

.small-text p {
  font-size: 1em;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.emojis {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-around;
  filter: grayscale(0.5);
  opacity: 0.6;
  font-size: 2rem;
  width: 100%;
  height: calc(100% + 4rem);
  pointer-events: none;
}

.emojis span {
  animation-duration: 6s;
  animation-name: flowing-emojis;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  opacity: 0;
  transform: scale(0.8);
}

.emojis span:nth-child(2) {
  animation-delay: 3s;
}

.emojis span:nth-child(3) {
  animation-delay: 1.5s;
}

.emojis span:nth-child(4) {
  animation-delay: 4.5s;
}

.emojis span:nth-child(5) {
  animation-delay: 6s;
}

@keyframes flowing-emojis {
  0% {
    opacity: 0;
    transform: scale(0.8);
    top: 100%;
    transform-origin: center bottom;
  }

  10% {
    opacity: 100%;
    transform: scale(1);
  }

  90% {
    opacity: 100%;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    top: 0;
    transform: scale(0.8);
    transform-origin: center top;
  }
}
</style>
