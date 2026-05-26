import asyncio
from playwright.async_api import async_playwright
import os

async def verify_frontend():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Set a larger viewport to see more at once
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        # Increased timeout for slow dev server
        try:
            await page.goto('http://localhost:3000', wait_until='networkidle', timeout=60000)
        except Exception as e:
            print(f"Initial load timed out, but continuing... {e}")

        # Directory for screenshots
        os.makedirs('verification', exist_ok=True)

        # Function to scroll slowly to trigger animations
        async def scroll_page():
            await page.evaluate("""
                async () => {
                    await new Promise((resolve) => {
                        let totalHeight = 0;
                        let distance = 100;
                        let timer = setInterval(() => {
                            let scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;
                            if(totalHeight >= scrollHeight){
                                clearInterval(timer);
                                resolve();
                            }
                        }, 100);
                    });
                }
            """)

        print("Scrolling page to trigger animations...")
        await scroll_page()
        # Wait a bit for animations and images to finish/load
        await asyncio.sleep(5)

        # Capture sections
        sections = {
            'hero': 'text="Style That Speaks"',
            'trending': 'text="Trending Now"',
            'flash_deals': 'text="Flash Deals"',
            'best_sellers': 'text="Best Sellers"',
            'featured': 'text="Women\'s Clothing"', # Changed from "Shop by Category"
            'ai_recs': 'text="Picked For You"',
            'testimonials': 'text="Voices of Distinction"',
            'newsletter': 'text="Join the Inner Circle"'
        }

        for name, selector in sections.items():
            try:
                element = page.locator(selector).first
                if await element.is_visible():
                    # Get the parent section or a container for better context
                    await element.scroll_into_view_if_needed()
                    await asyncio.sleep(0.5) # small wait after scroll
                    await page.screenshot(path=f'verification/{name}.png')
                    print(f"Captured {name}")
                else:
                    print(f"Section {name} not visible")
            except Exception as e:
                print(f"Could not capture {name}: {e}")

        # Capture full page
        await page.screenshot(path='verification/homepage_full_v2.png', full_page=True)
        print("Captured full page v2")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_frontend())
