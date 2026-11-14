# After the Mission

An interactive Moon and Mars museum by Space Buddys for NASA Space Apps 2026.

## Open the museum

Open `website/index.html` in your browser. No installation or build is required.
Internet access is used for optional fonts and external NASA sources.

## Work together

Once this project is uploaded, the owner can invite a collaborator from the
repository's Settings → Collaborators. The friend must accept the invitation.

For a beginner-friendly workflow, use GitHub Desktop. The owner can add this
existing local repository. The friend can clone the published repository.

Before editing, click Fetch origin and then Pull origin if updates exist.
Make changes and refresh `website/index.html` to preview them.
Review the changed files, write a short description, commit, then Push origin.
Coordinate before editing the same file. For independent work, create a branch
and open a pull request so the other person can review changes before merging.

With Git on the command line, run these in the project directory after the
remote repository and upstream branch have been configured.

```sh
git pull --ff-only
# Edit and preview your changes.
git status
git add website README.md START-HERE.txt .gitignore
git commit -m "Describe your changes"
git push
```

If pulling reports conflicting changes, keep your work and resolve the conflict
together before continuing. Avoid force-pushing over your teammate's work.

## Editing guide

- `website/exhibits.js` contains exhibit facts and NASA source links.
- `website/app.js` contains the main routes and pages.
- `website/interactions.js` contains the Moon stories, tour, and image viewer.
- `website/discovery.js` contains the timeline explorer, comparisons, and notes.
- `website/editorial.js` contains the opening scenes and archive gallery.
- The matching CSS files control appearance and animations.

Keep sources with factual claims. NASA image credits appear within the museum.
The Space Buddys artwork and visual effects are creative illustrations.
See START-HERE.txt for research and verification details.
