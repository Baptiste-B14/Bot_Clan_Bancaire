export function extractPlanetName(input) {

    const str = String(input);
    const match = str.match(/^[a-zA-Zéèàôê]+(?:-[a-zA-Zéèàôê]+)?/);

    if (match){
        return match[0];
    } else {
        return str;
    }
}