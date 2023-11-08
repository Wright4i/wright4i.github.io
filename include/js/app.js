(async function () {
  // Define custom IBM i languages
  const ibmiLangs = [
    "bnd",
    "cl",
    "cmd",
    "dds.dspf",
    "dds.icff",
    "dds.lf",
    "dds.pf",
    "dds.prtf",
    "mi",
    "pnlgrp",
    "rpg",
    "rpgle",
  ];

  // Fetch language definition files, logging any failures and ignoring them
  async function loadCustomLanguages(langs) {
    const fetchPromises = langs.map((lang) =>
      fetch(`/include/syntaxes/${lang}.tmLanguage.json`)
        .then((response) =>
          response.ok
            ? response.json()
            : Promise.reject(`Failed to load language: ${lang}`)
        )
        .then((grammar) => ({ id: lang, scopeName: `source.${lang}`, grammar }))
        .catch((error) => {
          console.error(error);
          return null;
        })
    );
    return (await Promise.all(fetchPromises)).filter(Boolean);
  }

  // Initialize Shiki highlighter
  if (typeof shiki === "undefined")
    throw new Error("Shiki library is not loaded.");
  const highlighter = await shiki.getHighlighter({ theme: "slack-dark" });

  // Load custom languages and add to Shiki
  const customLanguages = await loadCustomLanguages(ibmiLangs);
  customLanguages.forEach((langObj) =>
    highlighter.loadLanguage(langObj).catch(console.error)
  );

  // Configure Docsify
  window.$docsify = {
    name: "Wright4i Home",
    repo: "wright4i",
    loadNavbar: true,
    
    // Use Shiki as renderer for codeblocks
    markdown: {
      renderer: {
        code: function (code, lang) {
          try {
            return highlighter.codeToHtml(code, { lang });
          } catch {
            return this.origin.code.apply(this, arguments);
          }
        },
      }
    },
  };

  // Docsify plugin to add copy-to-clipboard functionality
  function addCopyButtons(hook) {
    hook.doneEach(() => {
      const codeBlocks = document.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        const button = document.createElement("button");
        button.className = "copy-button fa-fw fa-regular fa-clipboard";
        button.title = "Copy to Clipboard";
        button.setAttribute("data-clipboard-text", block.innerText);
        block.parentNode.insertBefore(button, block);
      });
      attachClipboardEvents();
    });
  }

  // Attach Clipboard.js events for copy functionality
  function attachClipboardEvents() {
    const clipboard = new ClipboardJS(".copy-button");
    clipboard.on("success", (e) => {
      setButtonStatus(e.trigger, "fa-square-check", "Copied to Clipboard");
      setTimeout(
        () => setButtonStatus(e.trigger, "fa-clipboard", "Copy to Clipboard"),
        2000
      );
    });
    clipboard.on("error", (e) => {
      setButtonStatus(e.trigger, "fa-square-xmark", "Failed to Copy");
      setTimeout(
        () => setButtonStatus(e.trigger, "fa-clipboard", "Copy to Clipboard"),
        2000
      );
    });
  }

  // Helper function to change button status
  function setButtonStatus(button, iconClass, title) {
    button.className = `copy-button fa-fw fa-regular ${iconClass}`;
    button.title = title;
  }

  // Add copy button plugin to Docsify
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(
    addCopyButtons
  );

  // Load Docsify asynchronously
  const docsifyScript = document.createElement("script");
  docsifyScript.src = "https://cdn.jsdelivr.net/npm/docsify@4";
  docsifyScript.onerror = () => console.error("Failed to load Docsify script.");
  document.body.appendChild(docsifyScript);
})();
