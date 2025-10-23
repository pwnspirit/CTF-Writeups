// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="about.html">About</a></li><li class="chapter-item expanded affix "><li class="part-title">Nix-OS</li><li class="chapter-item expanded "><a href="Nix-OS/package-nextjs-Nix.html"><strong aria-hidden="true">1.</strong> Package nextjs in nix</a></li><li class="chapter-item expanded affix "><li class="part-title">TryHackMe</li><li class="chapter-item expanded "><a href="tryhackme/The-Sticker-Shop.html"><strong aria-hidden="true">2.</strong> The Sticker Shop</a></li><li class="chapter-item expanded affix "><li class="part-title">Hackerone CTF</li><li class="chapter-item expanded "><a href="hacker101/get-started/index.html"><strong aria-hidden="true">3.</strong> Get Started</a></li><li class="chapter-item expanded "><a href="hacker101/Micro-CMSv1/index.html"><strong aria-hidden="true">4.</strong> Micro CMSv1</a></li><li class="chapter-item expanded affix "><li class="part-title">RootMe</li><li class="chapter-item expanded "><a href="rootme/APP_SYSTEM/index.html"><strong aria-hidden="true">5.</strong> APP System</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="rootme/APP_SYSTEM/ELF_x86_Stack_buffer_overflow_basic_1/index.html"><strong aria-hidden="true">5.1.</strong> ELF x86 Stack BOF basic 1</a></li></ol></li><li class="chapter-item expanded "><a href="rootme/WEB_CLIENT/index.html"><strong aria-hidden="true">6.</strong> WEB CLIENT</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="rootme/WEB_CLIENT/HTML_disabled_buttons/index.html"><strong aria-hidden="true">6.1.</strong> HTML - disabled buttons</a></li><li class="chapter-item expanded "><a href="rootme/WEB_CLIENT/JS_Authentication/index.html"><strong aria-hidden="true">6.2.</strong> JS Authentication</a></li><li class="chapter-item expanded "><a href="rootme/WEB_CLIENT/Javascript_Authentication/index.html"><strong aria-hidden="true">6.3.</strong> Javascript - Authentication</a></li><li class="chapter-item expanded "><a href="rootme/WEB_CLIENT/Javascript_Native_code/index.html"><strong aria-hidden="true">6.4.</strong> Javascript - Native code</a></li><li class="chapter-item expanded "><a href="rootme/WEB_CLIENT/Obfuscation_JS/index.html"><strong aria-hidden="true">6.5.</strong> Obfuscation JS</a></li><li class="chapter-item expanded "><a href="rootme/WEB_CLIENT/Javascript_Obfuscation_2/index.html"><strong aria-hidden="true">6.6.</strong> Javascript - Obfuscation 2</a></li><li class="chapter-item expanded "><a href="rootme/WEB_CLIENT/Javascript_Source/index.html"><strong aria-hidden="true">6.7.</strong> Javascript - Source</a></li><li class="chapter-item expanded "><a href="rootme/WEB_CLIENT/Javascript-Obfuscation-3/index.html"><strong aria-hidden="true">6.8.</strong> Javascript - Obfuscation 3</a></li><li class="chapter-item expanded "><a href="rootme/WEB_CLIENT/Javascript-Webpack/index.html"><strong aria-hidden="true">6.9.</strong> Javascript Webpack</a></li></ol></li><li class="chapter-item expanded "><a href="rootme/WEB_Server/index.html"><strong aria-hidden="true">7.</strong> WEB SERVER</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="rootme/WEB_Server/JWT-Introduction/index.html"><strong aria-hidden="true">7.1.</strong> JWT Introduction</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
