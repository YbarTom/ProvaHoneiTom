function highestOccurrence(characters) {

    let maxCharacter = []
    let maxCount = 0;

    for (let i = 0; i < characters.length; i++) {

        let count = 0;

        for (let j = 0; j < characters.length; j++) {

            if (characters[i] === characters[j]) {

                count++;
                
            }

        }

        if (count == maxCount && !maxCharacter.includes(characters[i])) {

            maxCharacter.push(characters[i])

        } else if (count > maxCount) {

            maxCount=count
            maxCharacter = []
            maxCharacter.push(characters[i])

        }

    }

    return maxCharacter
}

function main() {
    
    console.log(highestOccurrence([2, 3, 2, 2, 2, 4, 2]))
    

    console.log(highestOccurrence([2, 3, 2, 3, 2, 3, 4]))
    

    console.log(highestOccurrence(['a', 'b', 'c', 'a', 'a', 'a', 'a']))
    

    console.log(highestOccurrence(['a', 'a', 2, 2, 2, 'a', 4]))
}

main()