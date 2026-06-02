// Client testimonials for the Testimonials window.

export interface Testimonial {
    name: string;
    role: string;
    quote: string;
}

const testimonials: Testimonial[] = [
    {
        name: 'Peter',
        role: 'Full-stack developer, product collaboration',
        quote: 'Nour moves quickly without sacrificing readability. On both product decisions and technical details, he keeps a strong overall view and delivers something people can actually use.',
    },
    {
        name: 'Steve',
        role: 'Training center coordination',
        quote: 'The challenge was not only to have a website, but to explain a training offer clearly. Nour brought structure, clarity, and a real sense of presentation.',
    },
    {
        name: 'Sandy',
        role: 'Local business operator',
        quote: 'What I appreciated most was his ability to turn a business idea into a simple user journey. You can tell he thinks about usage as much as code.',
    },
];

export default testimonials;
