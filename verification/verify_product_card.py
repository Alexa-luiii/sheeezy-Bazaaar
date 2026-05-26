from playwright.sync_api import sync_playwright, expect
import time

def verify_product_card(page):
    # Go to the homepage
    page.goto("http://localhost:3000")

    # Wait for the page to load
    page.wait_for_selector("text=Trending Now")

    # 1. Capture the initial state of a product card
    trending_section = page.locator("section:has-text('Trending Now')")
    first_card = trending_section.locator("div.group").first

    # Take a screenshot of the card
    first_card.screenshot(path="verification/product_card_initial.png")

    # 2. Hover over the card to see animations
    first_card.hover()
    time.sleep(1) # Wait for animations

    # Check if "ADD TO CART" button is visible
    add_to_cart = first_card.get_by_role("button", name="ADD TO CART")
    expect(add_to_cart).to_be_visible()

    # Check if Quick View button is visible
    quick_view = first_card.get_by_role("button", name="QUICK VIEW")
    expect(quick_view).to_be_visible()

    # Take a screenshot of the hovered state
    first_card.screenshot(path="verification/product_card_hover.png")

    # 3. Test Quick View Modal
    quick_view.click()

    # Wait for modal - use a more specific selector to avoid conflict with error overlay
    modal = page.locator("div[role='dialog']").filter(has_text="ADD TO BAG")
    expect(modal).to_be_visible()

    # Check for modal content
    expect(modal.locator("h2")).to_be_visible()
    expect(modal.get_by_role("button", name="ADD TO BAG")).to_be_visible()

    # Take a screenshot of the modal
    page.screenshot(path="verification/quick_view_modal.png")

    # Close modal
    page.get_by_role("button", name="Close").click()
    # Wait for modal to be hidden
    time.sleep(1)

    # 4. Take a full page screenshot to see all sections
    page.screenshot(path="verification/homepage_full_v4.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Wait for dev server to be ready
            for _ in range(15):
                try:
                    response = page.goto("http://localhost:3000")
                    if response and response.status == 200:
                        break
                except:
                    pass
                time.sleep(2)

            verify_product_card(page)
        finally:
            browser.close()
