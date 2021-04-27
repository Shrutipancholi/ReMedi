// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract ReMedi {
    struct File {
        string File_id;
        address Patient_id;
        string File_name;
        string Description;
    }

    struct Patient {
        address Patient_id;
        string Patient_name;
        address[] Access_doctors;
    }

    struct Doctor {
        address Doctor_id;
        string Doctor_name;
    }
    uint256 MAX_INT =
        0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    mapping(address => File[]) private patientToFiles;
    mapping(address => File[]) private access_files;
    mapping(address => Patient) private patients;
    mapping(address => Doctor) private doctors;

    modifier patientRestricted(address user) {
        require(patients[user].Patient_id > address(0x0));
        _;
    }

    modifier doctorRestricted(address user) {
        require(doctors[user].Doctor_id > address(0x0));
        _;
    }

    function getFiles()
        public
        view
        patientRestricted(msg.sender)
        returns (File[] memory)
    {
        return patientToFiles[msg.sender];
    }

    function getAccessFiles() public view returns (File[] memory) {
        return access_files[msg.sender];
    }

    function getPatientInfo()
        public
        view
        patientRestricted(msg.sender)
        returns (
            address,
            string memory,
            address[] memory
        )
    {
        Patient memory p = patients[msg.sender];
        return (p.Patient_id, p.Patient_name, p.Access_doctors);
    }

    function getDoctorInfo()
        public
        view
        doctorRestricted(msg.sender)
        returns (address, string memory)
    {
        Doctor memory d = doctors[msg.sender];
        return (d.Doctor_id, d.Doctor_name);
    }

    function create_patient(string memory name) public {
        Patient memory p = patients[msg.sender];
        require(keccak256(abi.encodePacked(name)) != keccak256(""));
        require(!(p.Patient_id > address(0x0)));
        patients[msg.sender] = Patient({
            Patient_name: name,
            Patient_id: msg.sender,
            Access_doctors: new address[](0)
        });
    }

    function create_doctor(string memory name) public {
        Doctor memory d = doctors[msg.sender];
        require(keccak256(abi.encodePacked(name)) != keccak256(""));
        require(!(d.Doctor_id > address(0x0)));
        doctors[msg.sender] = Doctor({
            Doctor_name: name,
            Doctor_id: msg.sender
        });
    }

    function create_file(
        string memory file_hash,
        string memory des,
        string memory file_name
    ) public patientRestricted(msg.sender) {
        require(keccak256(abi.encodePacked(file_hash)) != keccak256(""));
        File memory newFile =
            File({
                File_id: file_hash,
                Patient_id: msg.sender,
                File_name: file_name,
                Description: des
            });
        patientToFiles[msg.sender].push(newFile);
    }

    function find_file_in_patient(string memory file_hash)
        internal
        view
        returns (uint256)
    {
        require(keccak256(abi.encodePacked(file_hash)) != keccak256(""));
        File[] storage lib_files = patientToFiles[msg.sender];
        for (uint256 i = 0; i < lib_files.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(patientToFiles[msg.sender][i].File_id)
                ) == keccak256(abi.encodePacked(file_hash))
            ) return i;
        }
        return (MAX_INT);
    }

    function find_file_in_doctor(address doctor, string memory file_hash)
        internal
        view
        returns (uint256)
    {
        require(keccak256(abi.encodePacked(file_hash)) != keccak256(""));
        File[] storage lib_files = access_files[doctor];
        for (uint256 i = 0; i < lib_files.length; i++) {
            if (
                keccak256(abi.encodePacked(access_files[doctor][i].File_id)) ==
                keccak256(abi.encodePacked(file_hash))
            ) return i;
        }
        return (MAX_INT);
    }

    function find_doctor_in_patient(address doctor)
        private
        view
        returns (uint256)
    {
        require(doctor > address(0x0));
        uint256 len = patients[msg.sender].Access_doctors.length;
        for (uint256 i = 0; i < len; i++) {
            if (patients[msg.sender].Access_doctors[i] == doctor) {
                return i;
            }
        }
        return (MAX_INT);
        //revert("doctor doesn't exist in the access");
    }

    function grant_FileAccess(address doctor, string memory file_hash)
        public
        patientRestricted(msg.sender)
    {
        require(keccak256(abi.encodePacked(file_hash)) != keccak256(""));
        require(doctors[doctor].Doctor_id == doctor);
        if (find_doctor_in_patient(doctor) == (MAX_INT)) {
            Patient storage p = patients[msg.sender];
            p.Access_doctors.push(doctor);
            patients[msg.sender] = p;
            access_files[doctor].push(
                patientToFiles[msg.sender][find_file_in_patient(file_hash)]
            );
        } else {
            File[] memory lib_files = access_files[doctor];
            for (uint256 i = 0; i < lib_files.length; i++) {
                if (
                    keccak256(abi.encodePacked(lib_files[i].File_id)) ==
                    keccak256(abi.encodePacked(file_hash))
                ) {
                    revert("already given the access");
                }
            }
            access_files[doctor].push(
                patientToFiles[msg.sender][find_file_in_patient(file_hash)]
            );
        }
    }

    function denied_FileAccess(address doctor, string memory file_hash)
        public
        patientRestricted(msg.sender)
    {
        require(doctors[doctor].Doctor_id == doctor);
        if (access_files[doctor].length == 0) revert("There is no element");
        else if (access_files[doctor].length == 1) {
            uint256 docpos = find_doctor_in_patient(doctor);
            if (docpos == (MAX_INT)) {
                revert("Doctor is already not in access");
            }
            patients[msg.sender].Access_doctors[docpos] = patients[msg.sender]
                .Access_doctors[patients[msg.sender].Access_doctors.length - 1];
            patients[msg.sender].Access_doctors.pop();
        }
        uint256 pos = find_file_in_doctor(doctor, file_hash);
        if (pos == (MAX_INT)) revert("File is already out of access");
        access_files[doctor][pos] = access_files[doctor][
            access_files[doctor].length - 1
        ];
        access_files[doctor].pop();
    }
}
