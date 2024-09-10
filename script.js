
const memberInput = document.querySelector("#member");
const container = document.querySelector("#container");
const highestVoteMemberDiv = document.getElementById("highestVoteMember");

const membersData = [];

const loopHandler = () => {
    container.innerHTML = "";
    let i = 0;
    let highestVote = 0;
    let highestVoteIndex = -1;

    for (let item of membersData) {
        container.innerHTML += `
            <div class="mb-4 flex items-center justify-between">
                <span class="text-lg font-semibold"> ${item.name} 
                    <span class="text-green-600">vote: ${item.vote}</span>
                </span>
                <span>
                    <button class="ml-2 px-4 py-2 border rounded-md bg-green-600 text-white shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105" onclick="voteHandlerplus(${i})">+1</button>
                    <button class="ml-2 px-4 py-2 border rounded-md bg-orange-600 text-white shadow-md hover:bg-orange-700 transition duration-300 transform hover:scale-105" onclick="voteHandlerminus(${i})">-1</button>
                    <button class="ml-2 px-4 py-2 border rounded-md bg-red-600 text-white shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105" onclick="deleteHandler(${i})">Delete</button>
                    <button class="ml-2 px-4 py-2 border rounded-md bg-blue-600 text-white shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105" onclick="editMember(${i})">Edit</button>
                </span>
            </div>
        `;

        // Find member with the highest vote
        if (item.vote > highestVote) {
            highestVote = item.vote;
            highestVoteIndex = i;
        }

        i++;
    }

    // Display the member with the highest vote
    if (highestVoteIndex !== -1) {
        highestVoteMemberDiv.textContent = `Highest Votes: (${membersData[highestVoteIndex].name})`;
    } else {
        highestVoteMemberDiv.textContent = "";
    }
};

const voteHandlerplus = (index) => {
    membersData[index].vote += 1;
    loopHandler();
};

const voteHandlerminus = (index) => {
    membersData[index].vote -= 1;
    loopHandler();
}

const submitHandler = () => {
    const newMemberName = memberInput.value.trim();

    // Check if the name is empty
    if (!newMemberName) {
        alert("Name can't be empty.");
        return;
    }

    // Check if the member name already exists
    if (membersData.some(member => member.name.toLowerCase() === newMemberName.toLowerCase())) {
        alert("Cannot add the same name of the member twice.");
        return;
    }

    const member = {
        name: newMemberName,
        vote: 0
    };

    membersData.push(member);
    memberInput.value = "";
    loopHandler();
}

const deleteHandler = (i) => {
    if (confirm(`Are you sure you want to delete ${membersData[i].name}?`)) {
        membersData.splice(i, 1);
    } else {
        return;
    }
    loopHandler();
}

const editMember = (index) => {
    const newName = prompt('Enter the new name:');

    // Validate if the new name is empty or if the user pressed "Cancel"
    if (newName === null || newName.trim() === "") {
        alert("Name can't be empty.");
        return;
    }

    // Check if the new name already exists
    if (membersData.some(member => member.name.toLowerCase() === newName.toLowerCase())) {
        alert("Cannot set the same name for another member.");
        return;
    }

    // If valid, update the member's name
    membersData[index].name = newName;
    loopHandler();
}

loopHandler();