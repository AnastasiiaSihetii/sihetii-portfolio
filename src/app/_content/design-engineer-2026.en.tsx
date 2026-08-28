import { fig, h2, h3, ol, p, sep, stats, ul, type Block } from "./blocks";

/* Англійська версія дослідження. Український оригінал лежить поруч і не
   змінюється: він опублікований, на нього є посилання, і його текст —
   авторський. Тут переклад, який тримається його структури порядок у порядок
   і його ж чисел. Жодного джерела не додано й не прибрано. */

export const designEngineer2026En = {
  href: "/en/articles/design-engineer-2026",
  title: "Design Engineer in 2026: the role and who is hiring",
  metaTitle: "Design Engineer in 2026: the role and who is hiring",
  metaDescription:
    "A study of the design engineer role on 2026 data. Global openings with salary ranges, a consolidated requirements profile, a text analysis of 247 design vacancies on DOU, and the route in from product design.",
  ogTitle: "Design Engineer in 2026: a study of the role",
  ogDescription:
    "Global openings at Anthropic, Vercel, Cursor and Ramp, a requirements profile, and a deep cut of the Ukrainian market across 247 DOU vacancies.",

  lead: [
    "A design engineer designs the interface and takes it to production code themselves. Over the past year the role was opened by Anthropic, Vercel, Cursor, Ramp and Lovable, while in Ukraine it still hides under titles like UX Designer or Product Designer.",
    "I started working as a design engineer myself, and I wanted to understand what the role looks like on the market now and what I am expected to cover in it. I compared the global market with the Ukrainian one. The global market sets the standard: who hires, what they ask for, what they pay, how they interview. And the Ukrainian one: what the text of 382 design and 147 front-end vacancies from DOU and Djinni actually shows. How much designers earn against developers, who already works in this role, and how I looked for that work myself. At the end there is a consolidated list of requirements for the profession and conclusions about what to do with all of it. I did this research with the help of the Claude Fable 5 model.",
  ],

  byline: { name: "Anastasiia Sihetii", date: "25 August 2026", avatar: "/articles/img/author.jpg" },

  hero: {
    src: "/articles/img/design-engineer-2026-lede.png",
    alt: "A sheet of ruled paper with words from design engineer job posts set in blue monospace: craft, taste, polish, ownership, vibe coding, tokens, prompt to production, no handoff, Figma to code, Vercel, Claude Code, Cursor, AI-native, agentic. A few words are painted over with correction fluid.",
    width: 2880,
    height: 928,
  },

  blocks: [
    p("My name is Nastia. I am a product designer with more than five years of experience building interfaces for agencies, startups and enterprise products. I already work as a design engineer and combine design with front-end work on a commercial project."),
    p("Contents"),
    ol(
      <><a href="#who">What a design engineer is</a></>,
      <><a href="#change">What changed in a designer&#39;s work over the past year</a></>,
      <><a href="#hiring">Who hires and what they pay</a></>,
      <><a href="#ukraine">And what about Ukraine</a></>,
      <><a href="#requirements">Requirements for the profession: the consolidated list</a></>,
      <><a href="#interview">The interview and the portfolio</a></>,
      <><a href="#summary">In summary</a></>,
    ),

    h2("who", "What a design engineer is"),
    p("A design engineer works where product design meets the front end. A designer delivers a mockup and a description of states, which a developer then builds. A design engineer delivers a finished component in the codebase: with its states, animation, accessibility and behaviour across screens. There are no intermediate artefacts for handoff in this work, because there is nobody to hand off to. Hence the words job posts use for the role: ownership, craft, and a senior bar."),
    p(<>The term has a short history, and <a href="https://luhr.co/blog/2024/02/26/the-origins-of-design-engineering/" target="_blank" rel="noopener">David Luhr has assembled its chronology</a>. For the past ten years similar hybrid roles hid under the titles UI engineer, UX engineer or full-stack designer. One of the first books about the profession, the <a href="https://designbetterpodcast.com/p/design-engineering-handbook" target="_blank" rel="noopener">Design Engineering Handbook</a>, came out in 2020. It was written by Natalya Shelburne and colleagues from the New York Times, Mailchimp, Minted and Indeed. The term itself, by Shelburne&#39;s account, she coined together with Aarron Walter at a conference in Sydney. In 2022 Jim Nielsen&#39;s essay <a href="https://blog.jim-nielsen.com/2022/the-case-for-design-engineers/" target="_blank" rel="noopener">&laquo;The Case for Design Engineers&raquo;</a> spread through the industry, and in 2024 Vercel <a href="https://vercel.com/blog/design-engineering-at-vercel" target="_blank" rel="noopener">wrote on its blog</a> about how its design engineers work in three modes: alongside designers, inside product teams, and on their own, from sketch to release. The title went mainstream in 2024–2026, once designers got tools that let them take a mockup to working code themselves, without even knowing how to write it.</>),

    sep(),
    h2("change", "What changed in a designer's work over the past year"),
    p(<>In May 2026 Designer Fund and Foundation Capital launched the <a href="https://stateofaidesign.com/" target="_blank" rel="noopener">AI in Design Report</a>, which they kept adding to through August: a survey of 900+ designers from 60+ countries.</>),
    stats(
      { value: "50%", label: "of designers have already shipped AI-generated code to production" },
      { value: "65%", label: "say they do more engineering and PM work than a year ago" },
      { value: "20%", label: "of respondents call themselves a design engineer" },
    ),
    p("A comparison with last year's measurement shows how fast this is moving. Weekly use of AI in design grew from 54% in 2025 to 91% in 2026. For 43% of respondents a working prototype is already part of the expected output. There is a flip side. The share of designers who report a drop in team collaboration grew from 5% to 20%. Time is draining out of live discussion and into prompts and terminals."),
    p("Producing an interface got cheaper, because an agent generates a component in minutes. Design did not get cheaper along with it: for 80% of designers AI helps but does not replace their own sense of quality, and only 5% of managers came to value execution quality less. Half of hiring managers now weigh AI fluency more heavily when hiring designers."),
    p(<>Figma confirms the same vector in separate research. In a <a href="https://www.figma.com/blog/why-demand-for-designers-is-on-the-rise/" target="_blank" rel="noopener">February survey of hiring managers</a>, 82% say demand for designers has grown or held steady, and 73% see growing demand for AI-tool fluency. Demand for senior designers is rising at 56% of companies, for juniors at 25%.</>),

    sep(),
    h2("hiring", "Who hires and what they pay"),
    p(<>Online I came across several boards that collect vacancies specifically for design engineers. Let us take <a href="https://www.designengineerjob.com/" target="_blank" rel="noopener">designengineerjob.com</a> as an example, together with company career pages, a snapshot at the end of August 2026, web and product roles. These are openings at Anthropic, Vercel, Cursor, Replit, Ramp, Lovable, Supabase, Runway, Cloudflare, Airtable, Meta and others. About half the listings on the board are dated May, the rest mostly April, so the snapshot does not give a full picture of the market, but it is enough ground to understand the position.</>),
    fig(
      "/articles/img/board-designengineerjob.jpg",
      "Screenshot of the designengineerjob.com board: a list of design engineer openings at Runway, Mintlify, Console, OpenAI, Hex and Vercel with salary ranges",
      "wide",
      2272,
      1538,
      "The designengineerjob.com board, 24.08.2026: Runway $250–310k, Console $200–350k, Mintlify $145–200k.",
    ),
    p("The title \"Design Engineer\" appears in most of the postings; variants like Design Technologist or Creative Coder show up only occasionally. A third of the roles are fully remote, but remote does not mean \"from anywhere\". Some titles say Senior, Staff, Lead or Principal outright; in the rest the level is buried in a requirement for 4–7+ years of experience."),
    p("The requirements in these postings repeat almost word for word. Cursor is looking for someone \"equally comfortable in Figma and your code editor\", with a stack of TypeScript, React, SolidJS, CSS and animation. Vercel expected the \"highest level of polish\" from a candidate; that vacancy is now closed. Anthropic writes accessibility and performance budgets into the role's area of responsibility. Lovable asks for a \"sharp eye for craft\" and screens candidates at product engineer level in the technical round. Ramp lists \"Claude\" as a skill tag next to React. The full requirements profile, consolidated from all the postings, comes further down in its own section."),

    sep(),
    h2("ukraine", "And what about Ukraine"),
    p(<>A <a href="https://jobs.dou.ua/vacancies/?search=design+engineer" target="_blank" rel="noopener">search for &laquo;design engineer&raquo; on DOU</a> returns 40 vacancies. Almost all of them are design engineers in the hardware sense, from miltech: UAVs, electronics, RF systems. Two are on-topic: Cracken, with Design Engineer in the title, and Cieden, where the role hides under &laquo;UX Designer&raquo;. There is still no separate &laquo;Design Engineer&raquo; category on DOU or on <a href="https://djinni.co/jobs/" target="_blank" rel="noopener">Djinni</a>.</>),
    p(<>A <a href="https://djinni.co/jobs/?all_keywords=design+engineer" target="_blank" rel="noopener">search for &laquo;design engineer&raquo; on Djinni</a> gives 61 vacancies, but only one is on-topic: <a href="https://djinni.co/jobs/844161-product-design-engineer/" target="_blank" rel="noopener">DOOR3</a>, an American company that opened a remote Product Design Engineer position on 20 August with the phrasing &laquo;one craft, not two stages with a handoff between them&raquo;. But the country field says EU, so with a &laquo;Ukraine&raquo; profile you cannot apply.</>),
    p("About the sample: every vacancy listed on DOU on 27.08.2026 in the Design (247) and Front End (86) categories, and every Djinni vacancy in the design categories (164 unique) and in JavaScript and React.js (64). A script downloaded the full text of each one and searched it for keywords: tool and technology names, the word AI in all its forms, and phrasing about code. Vacancies that hang on both DOU and Djinni are deduplicated on the pair of company and title: 29 such matches among the design vacancies and 3 among the front-end ones. That leaves 382 design vacancies and 147 front-end ones."),
    stats(
      { value: "4 of 382", label: "design vacancies on DOU and Djinni ask for a design engineer in substance: design and code in one role" },
      { value: "34 of 382", label: "mention Claude, another 15 Cursor, 9 v0 or Bolt, 4 Lovable. AI as a tool for code appears in 10% of descriptions" },
      { value: "196 of 382", label: "contain the word AI in some form. Half the market already writes about AI, but mostly as image generation" },
    ),
    p("React is mentioned by 16 design vacancies out of 382, TypeScript by 4, HTML and CSS by 48, Storybook by 6. So code as a requirement for a designer appears in 4% of descriptions. For comparison, across 147 front-end vacancies Claude is mentioned by 24, and one asks outright for \"Figma skills with a design engineer mindset\"."),
    p(<>On Djinni 133 design vacancies out of 164 are fully remote; on DOU 86 out of 247. The one trainee vacancy: <a href="https://djinni.co/jobs/820758-trainee-ux-ui-engineer/" target="_blank" rel="noopener">jito.dev is looking for a Trainee UX/UI engineer</a>, an intern who will work with Claude Code and Storybook in order to &laquo;understand and fix the front end&raquo; behind their own mockups. From the description: &laquo;You shouldn&#39;t fear that AI will take your job; you should be the one who uses AI to do the work of three people&raquo;. That vacancy has 205 applications.</>),
    h3("", "Now let us look at the vacancies themselves"),
    p(<><a href="https://jobs.dou.ua/companies/cieden/vacancies/367320/" target="_blank" rel="noopener">Cieden, UX Designer (AI-Native / Design Engineer)</a>, a design agency founded in Lviv in 2016, now registered in Toronto with a distributed team of 40+. Middle level, two to three years of experience. &laquo;Your delivery is a Vercel link, not just a deck&raquo;. &laquo;Pet Projects: This is huge for us. We want to see your deployed side projects with real code&raquo;. &laquo;Claude Code Mastery: Custom commands, agents, and workflow scripting&raquo;. Figma in their stack is described as a tool &laquo;for strategy and assets, not as the source of truth&raquo;.</>),
    fig(
      "/articles/img/cieden-dou.jpg",
      "Screenshot of the Cieden UX Designer (AI-Native / Design Engineer) vacancy on DOU: requirements Pet Projects with real code, Claude Code Mastery, Prototyping in Figma, Claude Code, Stitch",
      "mid",
      1834,
      1518,
      "Cieden on DOU: \"Pet Projects: This is huge for us. We want to see your deployed side projects with real code\" and \"Claude Code Mastery: Custom commands, agents, and workflow scripting\".",
    ),
    p(<><a href="https://jobs.dou.ua/companies/onepage-gmbh/vacancies/369135/" target="_blank" rel="noopener">Onepage</a>, a website builder made by Ukrainians, is looking for a Senior Product Designer and writes: &laquo;You assemble fast prototypes in Figma, in code, through Cursor and Claude Code&raquo;. And further: &laquo;if you do not have HTML, CSS or React skills yet, it matters that you are ready to get into them through Cursor and Claude Code&raquo;.</>),
    p(<><a href="https://jobs.dou.ua/companies/spaceberry/vacancies/367616/" target="_blank" rel="noopener">Spaceberry Studio</a> is looking for a Strong Junior UX/UI Designer, and among the tasks stands &laquo;Build products from your own designs using an agentic development approach with tools such as Claude Code, Codex, and Cursor&raquo;.</>),

    h3("", "What they pay"),
    p(<>The DOU salary reports for summer 2026 give two medians worth putting side by side: <a href="https://dou.ua/lenta/articles/salary-report-non-tech-summer-2026/" target="_blank" rel="noopener">designers</a> and <a href="https://dou.ua/lenta/articles/salary-report-devs-summer-2026/" target="_blank" rel="noopener">developers</a>.</>),
    stats(
      { value: "$2,475", label: "designer median, UI/UX and Product Design, 307 respondents" },
      { value: "$3,500", label: "developer median, 4,541 respondents" },
    ),
    p("The gap is over a thousand dollars a month, and experience does not close it. A designer with 10+ years has a median of $3,550, a senior developer $4,500, a tech lead $5,500. There are no Ukrainian salary ranges for design engineer yet, but on the global market this role is paid on the engineering scale, because the person is responsible for code in production. For a designer, that is a move towards the higher range."),

    h3("", "The field is already growing in Ukraine"),
    p(<>Over 2026 DOU published at least four pieces from people who combine design and code. <a href="https://dou.ua/forums/topic/60864/" target="_blank" rel="noopener">Mariia Nechyporuk</a> writes about skills for Claude Code, <a href="https://dou.ua/forums/topic/61294/" target="_blank" rel="noopener">Denys Osadchyi</a> about his own bridge between Figma and Claude Code, <a href="https://dou.ua/forums/topic/59081/" target="_blank" rel="noopener">Olena Ivlieva</a> about the line between generation and a product, <a href="https://dou.ua/forums/topic/60149/" target="_blank" rel="noopener">Yana Lizghova</a> about a shop assembled with Claude Code. And I write about it a little too.</>),
    p(<>Courses are appearing alongside. <a href="https://volomydyr.com/" target="_blank" rel="noopener">Volodymyr Merlenko</a> from Cieden released a Design Engineer plugin for Claude Code, access for a donation to the KOLO foundation. <a href="https://www.md-academy.design/" target="_blank" rel="noopener">Denys Osadchyi</a>, besides the bridge from Figma, runs md.academy, an academy for design engineers: six 90-minute sessions on Claude Code, design tokens and design systems. <a href="https://uiuxpolyudsky-vibecode.com.ua/" target="_blank" rel="noopener">Alesia Boiko</a> of &laquo;UI/UX Design po-liudsky&raquo; put together &laquo;AI Product Design &amp; Design Engineering&raquo;: over fifty video lessons, from prompts and Figma Make to Next.js, Supabase and deployment. <a href="https://prjctr.com/course/build-your-startup-with-ai" target="_blank" rel="noopener">Projector</a> is launching &laquo;Build Your Startup with AI&raquo;.</>),

    h3("", "How I looked for work as an engineer"),
    p("There really are few vacancies with \"design engineer\" in the title, as you can see. So I started with the good old method and wrote to people I had worked with before. I asked whether they or anyone they knew had a task that needed a design engineer specifically. That is how I found the project I have been running for two months now."),

    sep(),
    h2("requirements", "Requirements for the profession: the consolidated list"),
    p("Based on American, European and Ukrainian vacancies, sorted by how often they repeat."),

    h3("", "Repeats in almost every vacancy"),
    ul(
      "Front end: React, TypeScript, semantic HTML and modern CSS.",
      "Ownership: carrying an interface from idea to production on your own.",
      "A design system in code: components with states, tokens, standards.",
      "Motion and micro-interactions: Framer Motion, CSS animation, a sense of timing.",
      "Prototyping in code as the everyday way of working.",
      "Craft: typography, layout, detail.",
      "Accessibility, responsiveness and performance: semantics, focus states, reduced motion, Core Web Vitals.",
      "AI tools in the daily process, Claude Code and Cursor, plus your own judgement of what they produce.",
      "Figma, with equal confidence in a code editor.",
      "A portfolio of live products or working prototypes instead of mockups.",
      "Communication: working in pairs with designers, engineers and marketers, and writing clearly.",
    ),

    h3("", "Appears depending on the company"),
    ul(
      "Product thinking: think like a PM, build like an engineer.",
      "Working without a design team, typical for startups.",
      "Testing prototypes with users.",
      "Mentoring and setting standards for the team in senior and staff roles.",
      "Marketing sites, conversion experiments, SEO and analytics in Web & Brand roles.",
      "Headless CMS and content infrastructure for large sites.",
      "Tooling for the team: Figma plugins, MCP integrations, your own agents and skills.",
      "Interaction patterns for AI products: show what the agent is doing and let a person check it.",
      "Complex web interactions: WebGL, 3D, data visualisation.",
      "English at B2+ in Ukrainian and remote vacancies.",
    ),

    h3("", "Requirements from other roles: worth recognising"),
    ul(
      "A technical screen at product engineer level, architecture and performance budgets. That is a staff engineer bar.",
      "Deployments, technical SEO, localisation, incident response. That is a web platform engineer.",
      "Electron and native UI frameworks. That is a desktop developer.",
      "Moving the whole team onto an AI process. That is a leadership role.",
    ),

    sep(),
    h2("interview", "The interview and the portfolio"),
    p(<>Companies that describe their process publicly have one thing in common: you are asked to build something. After conversations with a recruiter, a manager and the team, Linear gives a <a href="https://linear.app/now/why-and-how-we-do-work-trials-at-linear" target="_blank" rel="noopener">paid work trial</a> of two to five days with access to Slack, Notion, GitHub and Figma. They assess taste, judgment, ownership and product sense. <a href="https://jobs.ashbyhq.com/lovable/51885ae5-4f4c-46c4-abd3-d7aad1c8d9c0" target="_blank" rel="noopener">Lovable</a> runs technical interviews with a product-engineer-level screen and, &laquo;in some cases&raquo;, paid test work. A classic portfolio review with someone flipping through case studies barely happens any more. By the observation of <a href="https://verifiedinsider.substack.com/p/faq-design-hiring-in-2026" target="_blank" rel="noopener">Tom Scott</a> of Verified Insider, teams ask for unfinished files and the working process, and AI fluency has become the most visible dividing line between candidates.</>),
    p(<>A design engineer&#39;s portfolio starts with their own site: made by themselves, with their own interactions. Then come the components, with empty states, error states and accessibility built in from the start. <a href="https://uithings.com/design-engineering" target="_blank" rel="noopener">The Complete Guide to Design Engineering</a> advises showing them in a public Storybook with documentation, and keeping a commit history alongside that shows how you worked the details out.</>),

    sep(),
    h2("summary", "In summary"),
    ul(
      "In Ukraine half of design vacancies mention AI, 9% ask for Claude or Cursor, 4% React, and only 1% is looking for a design engineer in substance. Vacancies already ask for a designer with engineering skills, but a separate position and category for it has not appeared yet.",
      "In Ukraine you can get into the role earlier than on the global market. There, junior vacancies are at zero and the bar is 4–7+ years. Here Cieden takes a middle, Spaceberry a junior, jito.dev a trainee, even if without the word engineer in the title.",
      "The developer median in Ukraine is a thousand dollars above the designer median, and the gap does not close with experience. On the global market a design engineer is paid on the engineering scale; there is no Ukrainian data on this role yet.",
    ),
    p("What to do with this:"),
    ul(
      "Search for vacancies by the words in the description: Claude Code, Cursor, React, prototype.",
      "Turn your portfolio into your own site, your own components with states, a Storybook, a commit history.",
      <>Start practising. Take a small pain of your own that you have long wanted to close, and build it as a working thing without Figma, straight through generation. That is how you get used to the process where an interface is born from a prompt. Anthropic has just opened <a href="https://academy.claude.com/" target="_blank" rel="noopener">Claude Academy</a>, free courses and tutorials on Claude Code, where you can try everything described above on yourself.</>,
    ),

    sep(),
    h2("", "Sources"),
    ol(
      <><a href="https://stateofaidesign.com/" target="_blank" rel="noopener">AI in Design Report 2026</a> (Designer Fund × Foundation Capital, May 2026, updated through August), the Tools, Craft and Teams sections</>,
      <><a href="https://www.figma.com/blog/why-demand-for-designers-is-on-the-rise/" target="_blank" rel="noopener">Figma: Why Demand for Designers Is on the Rise</a> (survey of hiring managers, 10.02.2026)</>,
      <><a href="https://vercel.com/blog/design-engineering-at-vercel" target="_blank" rel="noopener">Design Engineering at Vercel</a> (29.03.2024)</>,
      <><a href="https://luhr.co/blog/2024/02/26/the-origins-of-design-engineering/" target="_blank" rel="noopener">The Origins of Design Engineering</a> (David Luhr), a chronology of the term</>,
      <><a href="https://designbetterpodcast.com/p/design-engineering-handbook" target="_blank" rel="noopener">Design Engineering Handbook</a> (Natalya Shelburne, Adekunle Oduye, Kim Williams, Eddie Lou, 2020)</>,
      <><a href="https://blog.jim-nielsen.com/2022/the-case-for-design-engineers/" target="_blank" rel="noopener">Jim Nielsen: The Case for Design Engineers</a> (2022)</>,
      <><a href="https://www.designengineerjob.com/" target="_blank" rel="noopener">designengineerjob.com</a>, a curated job board</>,
      <><a href="https://jobs.generalcatalyst.com/companies/anthropic/jobs/79329265-design-engineer-web" target="_blank" rel="noopener">Anthropic: Design Engineer, Web</a></>,
      <><a href="https://www.welcometothejungle.com/en/companies/ramp/jobs/design-engineer_fr_wxsz6zrh" target="_blank" rel="noopener">Ramp: Design Engineer (Brand)</a> (vacancy closed)</>,
      <><a href="https://jobs.ashbyhq.com/lovable/51885ae5-4f4c-46c4-abd3-d7aad1c8d9c0" target="_blank" rel="noopener">Lovable: Staff / Principal Design Engineer, Web</a></>,
      <><a href="https://cursor.com/careers/design-engineer" target="_blank" rel="noopener">Cursor: Design Engineer</a></>,
      <><a href="https://builtin.com/job/lead-design-technologist/6957812" target="_blank" rel="noopener">Atlassian: Lead Design Technologist</a> (Sydney, vacancy closed)</>,
      <><a href="https://verifiedinsider.substack.com/p/faq-design-hiring-in-2026" target="_blank" rel="noopener">Tom Scott, Verified Insider: FAQ, Design Hiring in 2026</a></>,
      <><a href="https://uithings.com/design-engineering" target="_blank" rel="noopener">The Complete Guide to Design Engineering (2026)</a> (Tomas Laurinavicius)</>,
      <><a href="https://dou.ua/lenta/articles/salary-report-non-tech-summer-2026/" target="_blank" rel="noopener">DOU: Salaries in Design and other non-tech roles, summer 2026</a></>,
      <><a href="https://dou.ua/lenta/articles/salary-report-devs-summer-2026/" target="_blank" rel="noopener">DOU: Salaries of Ukrainian developers, summer 2026</a></>,
      <><a href="https://jobs.dou.ua/vacancies/?search=design+engineer" target="_blank" rel="noopener">DOU Jobs: search for &laquo;design engineer&raquo;</a>, plus a full text analysis of 247 vacancies in the Design category and 86 in Front End (snapshot 27.08.2026)</>,
      <><a href="https://jobs.dou.ua/companies/cieden/vacancies/367320/" target="_blank" rel="noopener">Cieden: UX Designer (AI-Native / Design Engineer)</a>, <a href="https://jobs.dou.ua/companies/onepage-gmbh/vacancies/369135/" target="_blank" rel="noopener">Onepage: Senior Product Designer</a>, <a href="https://jobs.dou.ua/companies/spaceberry/vacancies/367616/" target="_blank" rel="noopener">Spaceberry Studio: Strong Junior UX/UI Designer</a></>,
      <><a href="https://djinni.co/jobs/?all_keywords=design+engineer" target="_blank" rel="noopener">Djinni: search for &laquo;design engineer&raquo;</a> and a text analysis of 164 vacancies in the design categories and 64 in JavaScript and React.js, snapshot 27.08.2026. Separately: <a href="https://djinni.co/jobs/844161-product-design-engineer/" target="_blank" rel="noopener">DOOR3, Product Design Engineer</a>, <a href="https://djinni.co/jobs/820758-trainee-ux-ui-engineer/" target="_blank" rel="noopener">jito.dev, Trainee UX/UI engineer</a></>,
      <>DOU, pieces by Ukrainian design engineers in 2026: <a href="https://dou.ua/forums/topic/60864/" target="_blank" rel="noopener">Mariia Nechyporuk</a>, <a href="https://dou.ua/forums/topic/61294/" target="_blank" rel="noopener">Denys Osadchyi</a>, <a href="https://dou.ua/forums/topic/59081/" target="_blank" rel="noopener">Olena Ivlieva</a>, <a href="https://dou.ua/forums/topic/60149/" target="_blank" rel="noopener">Yana Lizghova</a></>,
      <><a href="https://volomydyr.com/" target="_blank" rel="noopener">Volodymyr Merlenko: the Design Engineer plugin for Claude Code</a>; <a href="https://www.youtube.com/watch?v=Uvl-tRga98g" target="_blank" rel="noopener">Anthropic, Dan Cary: Designing with Claude: From prompt to production</a> (Code w/ Claude 2026, London, 19.05.2026); <a href="https://www.md-academy.design/" target="_blank" rel="noopener">md.academy: an academy for design engineers, Denys Osadchyi</a>; <a href="https://uiuxpolyudsky-vibecode.com.ua/" target="_blank" rel="noopener">Alesia Boiko, UI/UX Design po-liudsky: AI Product Design &amp; Design Engineering</a>; <a href="https://prjctr.com/course/build-your-startup-with-ai" target="_blank" rel="noopener">Projector: Build Your Startup with AI</a>; <a href="http://web.archive.org/web/20260117192300/https://neoversity.com.ua/product-design-m" target="_blank" rel="noopener">Neoversity: HCI &amp; Design for the AI era</a> (archived copy)</>,
      <><a href="https://academy.claude.com/" target="_blank" rel="noopener">Claude Academy</a>, Anthropic&#39;s free Claude Code courses (August 2026)</>,
    ),
  ] satisfies Block[],
};
