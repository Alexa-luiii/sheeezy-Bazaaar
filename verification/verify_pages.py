from playwright.sync_api import sync_playwright, expect
import time

def verify_category_and_search(page):
    # 1. Verify Category Page
    print("Verifying Category Page...")
    page.goto("http://localhost:3000/category/bags")

    # Wait for heading
    expect(page.get_by_role("heading", name="Bags")).to_be_visible()

    # Check for filters
    expect(page.get_by_text("Price Range")).to_be_visible()
    expect(page.get_by_text("Brands")).to_be_visible()

    # Wait for products to load (out of skeleton state)
    page.wait_for_selector("text=Exquisite Pieces Found")
    time.sleep(2) # Give a bit more time for skeletons to clear

    # Screenshot Category Page
    page.screenshot(path="verification/category_page.png", full_page=True)

    # 2. Verify Search Page
    print("Verifying Search Page...")
    page.goto("http://localhost:3000/search")

    # Check for search input
    search_input = page.get_by_placeholder("Search for masterpieces...")
    expect(search_input).to_be_visible()

    # Type search query
    search_input.fill("gold")
    time.sleep(2) # Wait for filtering

    # Check results
    expect(page.get_by_text("Found")).to_contain_text("results for \"gold\"")

    # Screenshot Search Page
    page.screenshot(path="verification/search_page.png")

    # 3. Verify Empty Search
    search_input.fill("nonexistentproduct123")
    time.sleep(2)
    expect(page.get_by_text("No matches found")).to_be_visible()
    page.screenshot(path="verification/search_empty.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Wait for dev server
            for _ in range(15):
                try:
                    response = page.goto("http://localhost:3000")
                    if response and response.status == 200:
                        break
                except:
                    pass
                time.sleep(2)

            verify_category_and_search(page)
        finally:
            browser.close()
