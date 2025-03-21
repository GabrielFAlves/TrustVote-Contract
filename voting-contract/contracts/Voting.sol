// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    address public admin;
    mapping(uint256 => Candidate) public candidates;
    mapping(bytes32 => bool) public usedTokens; // Armazena tokens de voto usados
    uint256 public candidatesCount;

    event Voted(bytes32 indexed voteToken, uint256 candidateId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Apenas o admin pode executar isso");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addCandidate(string memory _name) public onlyAdmin {
        candidates[candidatesCount] = Candidate(_name, 0);
        candidatesCount++;
    }

    function vote(bytes32 voteToken, uint256 _candidateId) public {
        require(!usedTokens[voteToken], "Token de voto ja foi usado");
        require(_candidateId < candidatesCount, "Candidato invalido");

        candidates[_candidateId].voteCount++;
        usedTokens[voteToken] = true; // Marca o token como usado

        emit Voted(voteToken, _candidateId);
    }

    function getCandidate(uint256 _candidateId) public view returns (string memory, uint256) {
        require(_candidateId < candidatesCount, "Candidato invalido");
        return (candidates[_candidateId].name, candidates[_candidateId].voteCount);
    }
}
