# Semantic Strategies Used in Claiming Academic Contribution

## To Run

Tested on Ubuntu

```shell
# Optional but recommended
# Version lasted tested was node v16.16.0 (npm v8.11.0)
nvm use --lts
```

```shell
npm install # or npm i
```

```
npx parcel index.html
```

When done `Ctrl+C` in terminal

## To Edit

Hint: 
- Bulk of editing is in [data.json](https://github.com/pkiage/research-contribution/blob/master/data.json) and in vector graphic editor
- [data.json](https://github.com/pkiage/research-contribution/blob/master/data.json) editing will help give initial SVG for further editing
- SVG from just `npx parcel index.html`  most likely requires further editing in vector graphic editor

### Data used in Algorithmic Design

Change name and children in [data.json](https://github.com/pkiage/research-contribution/blob/master/data.json)

### SVG

Obtain SVG from web page using software ([SVGExport.io](https://svgexport.io/), [SVG Gobbler](https://github.com/rossmoody/svg-gobbler) etc.)

For further edits export as SVG to edit in various vector graphic editors (Adobe Illustrator, BoxySVG, LibreOffice - Draw, Inkscape etc.)

Consider adding assets created/edited in other software (Adobe Creative Cloud, Canva, Figma, Microsoft Office etc.)

## Inspiration

### Concept

Cognitive Bias Codex designed by John Manoogian III (jm3) and organized by Buster Benson

- [Cognitive bias cheat sheet: An organized list of cognitive biases because thinking is hard by Buster Benson](https://betterhumans.pub/cognitive-bias-cheat-sheet-55a472476b18?gi=1489e1783636)
- [Cognitive Bias Codex Poster](https://www.designhacks.co/products/cognitive-bias-codex-poster)
- [The Cognitive Bias Codex - Behance by John Manoogian III (jm3)](https://www.behance.net/gallery/46965711/the-Cognitive-Bias-Codex/)

### Implementation

- [jm3 Github Gist](https://gist.github.com/jm3/32175bc006a2ce05abd067468e4fa26c)
- [Rayraegah bias-viz Github Repository](https://github.com/Rayraegah/bias-viz)
### Data: Semantic Strategies
- [What do introduction sections tell us about the intent of scholarly work: A contribution on contributions](https://www.sciencedirect.com/science/article/pii/S0019850116303261)

## Fixes if "To Run" has errors

### Update Node

```shell
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

sudo apt-get install -y nodejs
```

### Install nvm

```shell
sudo apt-get install curl

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Close then open terminal for changes to reflect

Verify installation

```shell
# should return nvm
command -v nvm

# should return version
nvm --version

# should list versions of Node currently installed
nvm ls
```

### Install current and stable LTS versions of Node.js

```shell
# list all versions of Node.js available
nvm ls-remote
```

```shell
# current stable LTS release of Node.js (production apps)
nvm install --lts

# current release of Node.js (testing latest features)
nvm install node

# install specific version
# nvm install version
# Example version = v17.0.0
nvm install v17.0.0
```

Verify installation

```shell
nvm ls

node --version # or which node

npm --version # or which npm
```

### Specify version of Node to use

Current release of Node.js (testing latest features)

```shell
nvm use node
```

Current stable LTS release of Node.js (production apps)

```shell
nvm use --lts
```

Specify version

```shell
# nvm use version
# Example version = v17.0.0
nvm use v17.0.0
```

### Fixes References

- [How To Install Node.js on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
- [npm does not support Node.js v10.19.0](https://askubuntu.com/questions/1382565/npm-does-not-support-node-js-v10-19-0)
- [Parcel js can't run same project on Ubuntu](https://stackoverflow.com/questions/68801380/parcel-js-cant-run-same-project-on-ubuntu)
- [Solve - nvm: command not found error](https://bobbyhadz.com/blog/nvm-command-not-found)

