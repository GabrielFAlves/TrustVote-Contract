// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Voting {
    using ECDSA for bytes32;

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    address public admin;
    address public backendSigner;
    mapping(uint256 => Candidate) private candidates;
    mapping(address => bool) private hasVoted;
    uint256 public candidatesCount;

    event CandidateAdded(uint256 candidateId, string name);
    event Voted(
        address indexed voter,
        uint256 candidateId,
        string candidateName
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Apenas o admin pode executar isso");
        _;
    }

    constructor(address _backendSigner) {
        require(_backendSigner != address(0), "backendSigner nao pode ser nulo");
        admin = msg.sender;
        backendSigner = _backendSigner;
    }

    function addCandidate(string memory _name, bytes memory signature) public onlyAdmin {
        require(bytes(_name).length > 0, "Nome do candidato nao pode ser vazio");

        bytes32 messageHash = keccak256(abi.encodePacked(_name));
        address recoveredSigner = ECDSA.recover(
            MessageHashUtils.toEthSignedMessageHash(messageHash),
            signature
        );

        require(recoveredSigner == backendSigner, "Assinatura invalida!");

        candidates[candidatesCount] = Candidate(_name, 0);
        emit CandidateAdded(candidatesCount, _name);
        candidatesCount++;
    }

    function vote(uint256 _candidateId, bytes memory signature) public {
        require(!hasVoted[msg.sender], "Voce ja votou");
        require(_candidateId < candidatesCount, "Candidato invalido");

        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender));
        address recoveredSigner = ECDSA.recover(
            MessageHashUtils.toEthSignedMessageHash(messageHash),
            signature
        );

        require(recoveredSigner == backendSigner, "Assinatura invalida!");

        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, _candidateId, candidates[_candidateId].name);
    }

    function getCandidate(
        uint256 _candidateId
    ) public view returns (string memory, uint256) {
        require(_candidateId < candidatesCount, "Candidato invalido");
        return (
            candidates[_candidateId].name,
            candidates[_candidateId].voteCount
        );
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory all = new Candidate[](candidatesCount);
        for (uint256 i = 0; i < candidatesCount; i++) {
            all[i] = candidates[i];
        }
        return all;
    }
}

