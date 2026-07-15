import { prisma } from '../lib/prisma';

const posts = [
    {
        slug: "how-much-can-you-save-with-solar-in-2024",
        title: "How Much Can You Save with Solar in 2024?",
        excerpt: "Discover the real savings potential of switching to solar energy this year, including the latest government subsidies.",
        content: `
            <p class="mb-4 text-lg">Solar energy is more affordable than ever. With the new PM Surya Ghar Yojana, homeowners can get up to ₹78,000 in subsidies.</p>
            <h2 class="text-2xl font-bold mt-8 mb-4">The True Cost of Solar</h2>
            <p class="mb-4">For a standard 3kW system, the gross cost is approximately ₹1,80,000. After the maximum subsidy, the net cost drops to just ₹1,02,000.</p>
            <h2 class="text-2xl font-bold mt-8 mb-4">Return on Investment</h2>
            <p class="mb-4">Assuming an electricity tariff of ₹8/unit, a 3kW system generates roughly 360 units per month, saving you ₹2,880 monthly. That's a payback period of just 3 years!</p>
        `,
        featuredImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
        tags: "Savings,Subsidies,2024",
        seoTitle: "How Much Can You Save with Solar in 2024? | Krishnanuja",
        seoDesc: "Discover the real savings potential of switching to solar energy this year."
    },
    {
        slug: "on-grid-vs-off-grid-solar-systems",
        title: "On-Grid vs Off-Grid Solar Systems: Which is Right for You?",
        excerpt: "A comprehensive comparison between grid-tied and standalone solar systems to help you make an informed decision.",
        content: `
            <p class="mb-4 text-lg">Choosing between on-grid and off-grid is the most important decision when installing solar.</p>
            <h2 class="text-2xl font-bold mt-8 mb-4">On-Grid Systems</h2>
            <p class="mb-4">These systems are connected to the utility grid. Excess power is sent to the grid via net metering. They are cheaper because they don't require expensive batteries.</p>
            <h2 class="text-2xl font-bold mt-8 mb-4">Off-Grid Systems</h2>
            <p class="mb-4">These systems are completely independent and rely on battery storage for nighttime power. They are essential for remote areas with frequent power cuts.</p>
        `,
        featuredImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
        tags: "Technology,Guide",
        seoTitle: "On-Grid vs Off-Grid Solar Systems | Krishnanuja",
        seoDesc: "A comprehensive comparison between grid-tied and standalone solar systems."
    }
];

const projects = [
    {
        title: "5kW Rooftop System Installed in Shivpur",
        description: "Successfully commissioned a 5kW on-grid solar system for a residential home in Shivpur. Expected annual savings: ₹60,000.",
        category: "Residential",
        capacity: "5kW",
        location: "Shivpur, Varanasi",
        imageUrl: "/Hybrid.webp",
        featured: true,
    },
    {
        title: "10kW Commercial Solar Project in Lanka",
        description: "Installed a 10kW commercial solar plant for a hotel in Lanka, Varanasi. Helping local businesses go green.",
        category: "Commercial",
        capacity: "10kW",
        location: "Lanka, Varanasi",
        imageUrl: "/Integrated.webp",
        featured: true,
    },
    {
        title: "8kW Off-Grid System for Farmhouse in Ramnagar",
        description: "Complete energy independence achieved with an 8kW Off-Grid system installation in Ramnagar.",
        category: "Residential",
        capacity: "8kW",
        location: "Ramnagar, Varanasi",
        imageUrl: "/Shakti Solar.webp",
        featured: true,
    },
];

async function main() {
    for (const post of posts) {
        await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: post,
            create: post
        });
    }

    await prisma.project.deleteMany({});
    for (const project of projects) {
        await prisma.project.create({
            data: project
        });
    }

    console.log("Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
