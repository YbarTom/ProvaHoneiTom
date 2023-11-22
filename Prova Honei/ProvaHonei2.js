function maxSubarraySum(characters, n) {

    let maxSum = null;

    for (let i = 0; i < characters.length; i++) {

        let count = 0

        for (let j = i; j < i+n; j++) {
            count = count + characters[j]
            
        }
        
        if (count > maxSum) {
            maxSum = count

        }
    }

    return maxSum
}


function main() {
    console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4))
    

    console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2))
    

    console.log(maxSubarraySum([4, 2, 1, 6], 1))
    

    console.log(maxSubarraySum([4, 2, 1, 6, 2], 4))
    

    console.log(maxSubarraySum([], 4))
}

main()