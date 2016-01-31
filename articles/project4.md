TL;DR: An eCommerce project for a vintage design store. We assisted in the transition from an mom-and-pop-shop with a Facebook page, to an online experience replacing the physical store. During the process we did everything from figuring out business goals to implementing an easy-to-use Shopify theme. In this project I've done agile project management, visual design and front-end development. See the result here: [https://www.klungeljungle.nl](Klungel Jungle).

<picture>
  <source type="image/svg+xml" srcset="/images/articles/kj_logo.svg">
  ![Klungel Jungle's logo](/images/articles/kj_logo.png)
</picture>

The project ran for 19 weeks. The first eight weeks were spent doing research and content inventory.

### Ground rules

As the manager for this project I started out by laying down some ground rules. I usually skip all of the ‘be on time’ stuff, everyone knows it's expected. I wanted to encourage constructive discussion and brainstorming during this project, so one of my rules was: speak your mind. Along with: always ask *why*.

Additionally, I never like it when people go off on their own with full radio silence, and report back three weeks later with a piece of a product that is in no way integrated or matching with the rest of the group's work. Hence my other rule: everything is to be done at least in pairs, where the person assigned the appropriate role for the task (eg. interface designs = visual designer) has the lead. This way I offloaded some decision-taking on my end and gave responsibility to my team members which works wonders for productivity and motivation. It also encouraged productive discussion and consensus on design decisions.

### Research

In our research we primarily focused on three areas: target audience, product and the entrepreneur. We needed to get a feel for all of these if we wanted to make this project a success. We did target audience interviews, we spoke extensively with our client about his wishes, thoughts and feelings. Our client attended art school back in the 90's. He completely understood the design process, our questions and blurry lines at the start of the project. We did SWOT analysis' on our clients' competition and their online presence, and we checked out the atmosphere and clientele in his and other shops to experience vintage furniture shopping for ourselves.

We figured out a couple of things early on in the process:

- This thing needed to be dead simple. Our client didn't have a lot of time on hands to maintain his online presence.
- Our target audience is hardcore. They are willing to do pretty much anything for that perfect piece of furniture.
- We can't completely kill offline contact. Our client needs to interact with customers.
- This guy is interesting. We need to tell and sell his story.
- These products and their designers have a story too, and they deserve some attention.

Alongside our research we modeled our future content. This, along with our research, provided us with the necessary insights to start iterating on our designs.

#### The missing step

What *exactly* do you do between your research and your first sketches? How do you interpret all of the information you have collected and turn it into a design?

After seeing the wonderful [Ida Aalen](https://twitter.com/idaaa) speak at dsgnday 2015, I knew I wanted to use the [Core Model](http://alistapart.com/article/the-core-model-designing-inside-out-for-better-results), designed by the Norse [Netlife Research](http://netliferesearch.com/). The Core Model, for me, was an answer to this question I've had for a while now: how do I actually take this giant heap of gathered information, and turn it into something worthwhile?

In short, it forces you to consider your content through the lens of your research. You prioritize your chunks based on business goals and user tasks for specific pages, the *Core pages*, which are the most important pages in your site. It's practically a bottom-up approach to content prioritization.

For us, the pages where we were most likely to both fulfill our business goals and user tasks were the product pages as well as the designer pages, which we used as a category.

The Core Model templates are usually filled in workshops where you get around 10 - 14 stakeholders and employees from all layers of a company to help you fill them in. Our client didn't have employees. So we did it for him. I walked my team through the workshop for each of our core pages.

[INSERT CORE MODEL SKETCHES]

The Core Model helped us understand the content and give meaning to it, giving us the possibility to sketch wireframes with far more confidence. Suddenly, there was clarity. We knew what content had to go where on the page. We just had to find the best way to present it and allow our target audience to interact with it.

### Design

We went through several iterations of sketched wireframes, user testing each iteration with around 4-5 users along the way. Once we were convinced the layout of our content worked, we hopped into Sketch.

[INSERT WIREFRAMES]

Before we started designing we sat with our client and talked about visual design direction. He felt inspired by the contemporary industrial interior design movement and asked us to look into translating that atmosphere into a visual design. It took me and our visual designer a couple of iterations to get the feeling right, but in the end, I believe we hit the mark. You can see the results of the visual designs below.

[INSERT 2 VISUAL DESIGNS]

### Front-end

We developed this eCommerce website on Shopify, mainly for its ease of use both on the dashboard, for our entrepreneur, as on the front-end with its easy-to-understand Liquid templating language for us. We had the luxury of having two front-end developers for this project, myself and one other guy.

We had to figure out a way to keep our environments in sync. Usually that's manageable, but the way Shopify handles deployments makes that a little harder. I set up Deploybot in combination with Github webhooks as a way to deploy to Shopify in an automated and controlled way. To speed up our development we used Timber, Shopify's starter theme, as boilerplate code. We changed around the layout and design. In the end, it took us around 400 commits (and some take-out food) to get to where we wanted to be. Fully responsive and working.

The finished result of this project can be found soon at [Klungel Jungle](https://klungeljungle.nl/).
