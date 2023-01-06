---
title: "Book Notes - How Linux Works"
metaTitle: "Book Notes - How Linux Works"
metaDesc: "Book Notes - How Linux Works"
socialImage: assets/images/book.jpg
date: "2022-07-19"
tags:
	- book
---

## 1. The Big Picture

* Components are arranged into layers, levels, classifications of components according to where the components sit between the user and the hardware.
* A linux system has three main levels
* The hardware as the base
* The next level up is the kernel, which is the core of the operating system
* Processes - the running programs that the kernel manages, collectively make up the system's upper level. Called user space
* There is a critical difference between how the kernel and the user processes run: the kernel runs in kernel mode, and the user proceesses run in user mode. Code running in kernel mode has unrestricted access to the processor and main memory
* The memory area that only the kernel can access is called kernel space
* User mode, in comparison, restricts access to a subset of memory and safe CPU operations
* If a process makes a mistake and crashes, the consequences are limited and can be cleaned up by the kernel
* Of all the hardware on a computer system, main memory is perhaps the most important
* Strictly speaking, a state is a particular arrangements of bits
* Nearly everything that the kernel does revolves around main memory
* Strictly speaking, a state is a particular arrangements of bits
* Nearly everything that the kernel does revolves around main memory
* Each process gets its own share of memory, and the kernel must ensure that each process keeps to its share
* The kernel is in charge of managing tasks in four general system areas: processes, memory, device drivers, system calls and support
* Process management describes the starting, pausing, resuming, scheduling, and terminating of processes
* Modern CPUs include a memory management unit (MMU) that enables a memory access scheme called virtual memory. When using memory, a process does not directly access the memory by its physical location in the hardware. Instead, the kernel sets up each process to act as if it had an entire machine to itself
* A system call is an interation between a process and the kernel
* The kernel also supports user processes with features other than traditional system calls, the most common of which are pseudodevices.
* Pseudodevices look like devices to user processes, but they're implemented purely in software. This means they don't technically need to be in the kernel, but they are usually there for pratical reasons
* User space also refers to the memory for the entire collection of running processes.
* A user is an entity that can run processes and own files
* Operating as root can be dangerous. It can be difficult to identify and correct mistakes because the system will let you do anything, even if it is harmful to the system
* In addition, as powerful as root user is, it still runs in the operating system's user mode, not kernel mode.
* Groups are sets of users. The primary purpose of groups is to allow a user to share file access to other members of the a group

---

## 2. Basic Commands And Directory Hierachy

* A shell is a program that runs commands
* Unix processes use I/O streams to read and write data. Processes read data from input streams and write data to output streams
* The shell can match simple patterns to file and directory names, a process known as globbing. This is the similiar to the concept of wildcards in other systems
* If you don't want the shell to expand a glob in a command, enclose the glob in single quotes
* Searching with locate is much faster than find, but if the file you're looking for is newer than the index, locate won't find it
* An environment variable is like a shell variable, but it's not specific to the shell. All processes on Unix systems have environment variable storage
* Because child processes inherit environment variables from their parent, many programs read them for configuration and options
* To get serious with Unix, you must be able to edit text files without damaging them
* You should try to learn one of the two de facto standard Unix text editors, vi and Emacs
* When you encounter a problem on a Unix system such as Linux, you must read the error message. Unlike messages from other operating systems, Unix errors usually tell you exactly what went wrong
* When troubleshooting errors, always address the first error first
* Warnings often look like errors, but they contain the word warning. A warning usually means something is wrong but the program will try to continue running anyway
* A segmentation fault essentially means that the person who wrote the program that you just ran screwed up somewhere. The program tried to access a part of memory that it was not allowed to touch, and the operating system killed it. Similarly a bus error means that the program tried to access some memory in a way it shouldn't have
* Each process on the system has a numeric process ID (PID)
* Unlike other signals, KILL cannot be ignored. The kernel just terminates the process and forcibly removed it from memory. Use this method only as a last resort
* You should not kill processes indiscriminately, especially if you don't know what you're doing.
* To see if you've accidently suspended any processes on your current terminal, run the jobs command
* Each unix file has a set of permissions that determine whatever you can read, write, or run the file
* The user permissions pertain to the user who owns the file
* The second set, group permissions, are for the file's group
* Everyone else on the system has access according to the third set, the other permissions, which are sometimes called world permissions
* Some executable files have an s in the user permissions listing instead of an x. This indicates that the executable is setuid, meaning that when you execute the program, it runs as though the file owner is the user instead of you
* Directories also have permissions. You can list the contents of a directory if it's readable, but you can only access a file in the directory if the directory is executable. You need both in most cases
* When making a symbolic link, check the command twice before you run it, because several things can go wrong
* If something goes wrong when you create a symbolic link to a directory, check that directory for errant symbolic links and remove them
* Symbolic links can also cause headaches when you don't know that they exist
* Don't forget the -s option when creating a symbolic link. Without it, ln creates a hard link, giving an additional real filename to a single file
* Below are the most important subdirectories in root:
	* /bin contains ready-ro-run programs
	* /dev contains device files
	* /etc core system configuration directory
	* /home holds home personal directory for regular users
	* /lib an abbreviation for library, this directory holds library files
	* /proc provides system statistics through a browsable directory-and-file interface
	* /run contains runtime data specific to the system
	* /sys similiar to proc in that it provides a device and system interface
	* /sbin the place for system executables
	* /tmp a storage area for smaller, temprary files that you don't care much about. If something is extremely important, don't put it in /tmp because most distributions clear /tmp when the machine boots and some even remove its old files periodically
	* /usr although pronounced "user", this subdirectory has no user files. Instead, it contains a large directory hierachy, including the bulk of the linux system
	* /var the variable subdirectory, where programs record information that can change over the course of time
	* /boot contains kernel boot files
	* /media a base attachment point for recoverable media
	* /opt this may contain additional third-party software. Many systems don't use /opt
	* /include holds header files used by the C compiler
	* /local is where administrators can install their own software
	* /man contains manual pages
	* /share contains files that should work on other kinds of Unix machines with no loss of functionality
* On linux systems, the kernel is normally a binary file. A boot loader loads this file into memory and sets it in motion when the system boots
* Of course, the system doesn't let just any user run commands as the super-user; you must configure the privileged users in your /etc/sudoers file
* Use the visudo command to edit /etc/sudoers. This command checks for file syntax errors after you save the file

---

## 3. Devices

* The first character is the files mode. If this character is b, c, p or s, the file is a device
* Block device
	* Programs access data from a block device in fixed chunks
	* Because a block device's total size is fixed and easy to index, processes have quick random access to any block in the device with the help of the kernel
* Character device
	* Character devices work with data streams
	* Character devices don't have a size; when you read from or write to one, the kernel usually performs a read or write operation on it
	* It's important to not that during character device interaction, the kernel cannot back up and reexamine the data stream after it has passed data to a device or process
* Pipe device
	* Named pipes are like character devices, with another process at the other end of the I/O stream instead of a kernel driver
* Socker device
	* Sockets are special-purpose interfaces that are frequently used for interprocess communication
* The dd command is very powerful, so make sure you know what you're doing when you run it. It's very easy to corrupt files and data on devices by making a careless mistake
* Most hard disks attached to the current Linux systems correspond to device names with an sd prefix. These devices represent entire disks
* Linux assigns devices to device files in the order in which its drivers encounter the devices
* Unfortunately, this device assignment scheme has traditionally caused problems when you are reconfiguring hardware
* Linux has two primary display modes: text mode and a graphical mode
* Linux has two sets of audio devices. There are seperate devices for the Advanced Linux Sound Architecture (ALSA) system interface and the older Open Sound System (OSS)
* Linux sound is a messy subject due to the many layers involved
* The rules files are in the /lib/udev/rules.d and /etc/udev/rules.d directories. The rules in the /lib are the defaults, and rules in /etc are overrides
* SATA disks also appear on your system as SCSI devices, but they are slightly different becuase most of them communicate through a translation layer in the libata library
* SCSI subsystem has three layers of drivers:
	* The top layer handles operations for a class of device
	* The middle layer moderates and routes the SCSI messages between the top and bottom layers, and keeps track of all of the SCSI buses and devices attached to the system
	* The bottom layer handles hardware-specific actions

---

## 4. Disks and Filesystems

* Partitions are subdivisions of the whole disk
* The kernel presents each partition as a block device, just as it would an entire disk. Partitions are defined on a small area of the disk called a partition table
* The next layer up from the partition is the filesystem, the database of files and directories that you're accustomed to interacting with in user space
* There are many kinds of partition tables. There's nothing special about a partition table, it's just a bunch of data that says how the blocks on the disk are divided
* People prefer the fdisk interface due to its interactive nature and the fact that it doesn't make any changes to the disk until you've had a chance to review them
* A primary partition is a normal subdivision of the disk
* An extended partition breaks down into logical partitions, which the operating system can then use as it would any other partition
* Viewing partition tables is a relatively simple and harmless operation. Altering partition tables is also relatively easy, but making this kind of change to the disk involves risks
* Make sure you have a backup if the disk you're partitioning contains critical data
* Ensure that no partitions on your target disk are currently in use
* With fdisk, you design your new partition table before making the actual changes to the disk, and it makes the changes only when you exit the program
* Any device with moving parts introduces complexity into a software system because there are physical elements that resist abstraction
* Storage devices with no moving parts, such as solid state disks (SSDs), are radically different from spinning disks in terms of their access characteristics
* One of the most significant factors affecting the performance of SSDs is partition alignment. When you read data from an SSD, you read it in chunks called pages
* Reasonably new versions of partitioning utilities include logic to put newly created partitions at the proper offsets from the beginning of the disks, so you probably don't need to worry about improper partition alignment
* The last link between the kernel and user space for disks is typically the filesystem
* The filesystem is a form of database
* The Virtual File System (VFS) abstraction layer completes the filesystem implementation
* On Unix, the process of attaching a filesystem to a running system is called mounting
* Almost all Linux systems include a temporary mount point, /mnt, which is typically used for testing
* You can identify and mount filesystems by their universally unique identifier (UUID), an industry standard for unique "serial numbers" to identify objects in a computer system
* It's much easier to mount a device by its name than by its crazy UUID
* You can change the UUID of a filesystem if necessary
* Linux, like other Unix variants, buffers write to the disk
* When you unmount a filesystem with umount, the kernel automatically synchronizes with the disk, writing the changes in its buffer to the disk
* If for some reason you can't unmount a filesystem before you turn off the system, be sure to run sync first
* For filesystems to work seamlessly, the kernel has to trust that a mounted filesystem has no errors and also that the hardware stores data reliably. If errors exist, data loss and system crashes may result
* Aside from hardware problems, filesystem errors are usually due to a user shutting down the system in a rude way (for example, by pulling out the power cord)
* Although many filesystems support journals to make filesystem corruption far less common, you should always shutdown the system properly
* Never use fsck on a mounted filesystem, the kernel may alter the disk data as you run the check, causing runtime mismatches that can crash your system and corrupt files
* If you think that something really bad has happened, try running fsck -n to check the filesystem without modifying anything
* Not all filesystems represent storage on physical media. Most versions of Unix have filesystems that serve as system interfaces
* Not every partition on a disk contains a filesystem. It's also possible to augment the RAM on a machine with disk space
* However, if you frequently access swap space because many active processes want to use the memory at once, you'll suffer serious performace problems because disk I/O is just to slow to keep up with the rest of the system
* Sometimes, the Linux kernel may choose to swap out a process in favor of a little more disk cache
* High performance servers should never dip into swap space and should avoid disk access if at all possible
* It's dangerous to configure no swap space on a general-purpose machine. If a machine completely runs out of both real memory and swap space, the Linux kernel invokes the out-of-memory killer to kill a process in order to free up some memory
* It's rather nice that you expand an ext2/ext3/ext4 filesystem while it's mounted. Unfortunately, it doesn't work in reverrse. You cannot shrink a filesystem when it's mounted
* However, user space typically uses the block I/O only for initializing operations, such as partitioning, filesystem creation, and swap space creation
* A traditional Unix filesystem has two primary components: a pool of data blocks where you can store data and a database system that manages the data pool

---

## 5. How The Linux Kernel Boots

* The best way to view the kernel's boot and runtime diagnostic messages is to retrieve the jounal for the kernel with the journalctl command
* Upon startup, the Linux kernel initializes in this general order:
	* CPU inspection
	* Memory inspection
	* Devices bus discovery
	* Device discovery
	* Autiliary kernel subsystem setup (network etc)
	* Root filesystem mount
	* User space start
* At the start of the book process, before the kernel and init start, a boot-loader program starts the kernel
* A boot loader does need a driver to access the disk, but it's not the same one that the kernel uses
* GRUB stands for Grand Unified Boot Loader
* One of GRUBs most important capabilites is filesystem navigation that allows for easy kernel image and configuration selection
* GRUB's use of the word root. Normally you think of root as your system's root filesystem. In GRUB configuration, this is a kernel parameter, located somewhere after the image name of the linux command
* One of the most important of these variables is $prefix, the filesystem and directory where GRUB expects to find its configuration and auxiliary support
* The GRUB configuration directory is usually /boot/grub or /boot/grub2
* Make sure that you build the correct target: it's different for MBR or UEFI boot
* One newer problem affecting Linux installations is dealing with the secure boot feature found on recent PCs. When active, this UEFI mechanism requires any boot loader to be digitally signed by a trusted authority in order to run
* Major Linux distributions have no problem with secure boot because they include signed boot loaders, usually based on a UEFI version of GRUB
* You can get around the secure boot requirement by disabling it in the UEFI settings. However, this won't work cleanly for dual-boot systems since Windows won't run without secure boot enabled
* Instead of configuring and running a Linux kernel, GRUB can load and run a different boot loader on a specific partition on your disk: this is called chainloading
* Boot loading schemes have several variations, but there are two main ones: MBR and UEFI
* Booting is radically different on UEFI systems compared toMBR

---

## 6. How User Space Starts

* User space starts in roughly this order:
	* init
	* essential low-level services, such as udevd and syslogd
	* network configuration
	* mid and high-level services (cron, printing and so on)
	* Login prompts, GUIs, and high-level applications, such as web servers
* init is a user-space program like any other program on the Linux system, and you'll find it in /sbin along with many of the other system binaries. Its main purpose is to start and stop the essential service processes on the system
* On all current releases of major Linux distributions, the standard implementation of init is systemd
* The systemd init is one of the newest init implementations on Linux
* A unit, for some system task. A unit can contain instructions for common startup tasks, such as starting a daemon, and it also has dependencies, which are other units
* Below are the most significant unit types that perform the boot-time taks on a typical Linux system:
	* Service units control the service daemons found on a Unix system
	* Target units control other units, usually by grouping them
	* Socket units represent incoming network connection request
	* Mount units represent the attachment of filesystems to the system
* When you boot a system, you're activating a default unit, normally a target unit called default target that groups together a number of service and mount units as dependencies
* To prevent confusion, stick to this rule: avoid making changes to the system unit directory, because your distribution will maintain it for you. Make your local changes to the system configuration directory
* When given the choice between modifying something in /usr and /etc, always change /etc
* The [Unit] section gives some details about the unit and contains description and dependency information
* You'll find the details about the service in the [Service] section, including how to prepare, start and reload the service
* A specifier is a variable-like feature often found in unit files
* Adding units to systemd is primarily a matter of creating, then activating and possibly enabling, unit files. You should normally put your own unit files in the system configuration directory (/etc/systemd/system) so that you won't confuse them with anything that came with your distribution won't overwrite them when you upgrade
* systemd wants a reasonable amount of information and control over every process it starts
* There are two basic startup types:
	* simple, the service process doesn't fork and terminate; it remains the main service process
	* forking, the service forks, and systemd expects the original service process to terminate
* Unix boot-time taks are fairly fault tolerant and can often fail without causing serious problems for standard services
* To accommodate the need for flexibility and fault tolerance systemd offers several dependency types and styles:
	* Requires - Strict dependencies. When activating a unit with a Requires dependency unit, systemd attempts to activate the dependency unit. If the dependency unit fails, systemd also deactivates the dependent unit
	* Wants - Upon activating a unit, systemd activates the unit's Wants dependencies, but it doesn't care if those dependencies fail
	* Requisite - Units that mush already be active. If the dependency hasn't been activated, systemd fails on activation of the unit with the dependency
	* Conflicts - When activating a unit with a Conflict dependency, systemd automatically deactivates the opposing dependency if it's active
* The Wants dependency type is specially significant because it doesn't propagate failures to other units
* This behavior produces a much more robust system, giving you the benefit of traditional init, where the failure of an earlier startup component doesn't necessary prohibit later components from starting
* Activating most service units with Require or Wants dependencies causes these units to start at the same time. This is optimal, because you want to start as many services as possible as quickly as possible to reduce boot time
* Enabling a unit does not activate it
* The [Install] section is usually responsible for the .wants and .requires directories in the system configuration directory
* An overall goal of systemd is to simplify dependency order and speed up boot time
* In System V init, this state of the machine is called its runlevel, which is denoted by a number from 0 through 6
* Runlevels serve various purposes, but the most common one is to distinguish between system startup, shutdown, single-user mode, and console mode states
* A typical System V init installation has two components: a central configuration file and a large set of boot scripts augmented by a smbolic link farm. The configuration file /etc/inittab is where it all starts
* A large number of symbolic links accross several subdirectories like this is called a link farm
* To start and stop services by hand, use the script in the init.d directory
* When adding a service, choose an appropiate place in the boot sequence to start it. If the service starts too soon, it may not work due to a dependency on some other service
* When switching runlevels, init tries to kill off any processes not in the inittab file for the new runlevel, so be careful when changing runlevels
* The proper way to shut down a Linux machine is to use the shutdown command
* The shutdown process takes several seconds. You should avoid resetting, or powering off a machine during a shutdown
* If you specify a time other than now, the shutdown command creates a file called /etc/nologin. When this file is present the system prohibits logins by anyone except the superuser
* If you really want to shut down your machine in a hurry, regardless of any potential damage from a disorderly shutdown, use the -f force option

---

## 7. System Configuration: Logging, System Time, Batch Jobs, And Users

* The widespread use of systemd has reduced the number of basic, independent daemons found on a typical Linux system
* Most system programs write their diagnostic output as messages to the syslog service
* A log message typically contains important information such as the process name, process ID and timestamp
* To get full access to the journal messages, you need to run journalctl either as root or as a user belonging to the adm or system-journal groups. The default user on most distributions has access
* Any field beginning with an underscore is a trusted field; the client that sends the message cannot alter these fields
* Filtering by severity sounds like it may save a lot of time, but you might not find much use for it
* The journals stored in /var/log/journal don't need rotation, because journald itself can identify and remove old messages
* Logging on Linux systems has changed significantly during its history, and it's a near-certainty that it will continue to evolve
* Most system configuration files on a Linux system are found in /etc
* Usernames exist only in user space, so any program that works with a username needs to find its corresponding user ID when talking to the kernel
* On most Linux systems, the password is no longer actually stored in the passwd file, but rather in the shadow file
* You should never have a user able to log in without a password
* Users that cannot log in are called pseudo-users
* The shadow file was introduced to provide a more flexible (and perhaps more secure) way of storing passwords
* Unix machines depend on accurate timekeeping
* Your system clock should be as close to the correct time as possible
* Time drift is the current difference between the kernel time and the true time
* If your machine is permanently connected to the internet, you can run a Network Time Protocol (NTP) deamon to maintain  the time using a remote server
* Most Linux distributions include timesyncd, and it's enabled by default. You shouldn't need to configure it
* Each user can have their own crontab file, which means that every system may have multiple crontabs, usually found in /var/spool/cron/crontabs
* Linux distributions normally have an /etc/crontab file for the entire system
* To run a job once in the future without using cron, use the at service
* To check that the job has been scheduled, use atq. To remove it, use atrm. You can also schedule jobs days into the future by adding the date in DD.MM.YY format
* When you temporarily switch to another user, all you're really doing is changing your user ID
* If you make a copy of the bash shell that is setuid root, any local user can execute it and have complete run of the system
* One of the most essential ways to keep unwanted activity off your system is to enforce user authentication with usernames and good passwords
* A multiuser system must provide basic support for user security in three areas: identification, authentication and authorization. The identification portion of security answers the question of who users are. The authorization piece asks users to prove that they are who they say they are. Finally, authorization is used to define and limit what users are allowed to do

---

## 8. A Closer Look At Processes And Resource Utilization

* The ps command lists current processes and their usage statistics, but it does little to tell you how processes change over time. Therefore, it won't immediately help you to determine which process is using too much CPU time or memory
* In Linux, some processes are divided into pieces called threads. A thread is very similiar to a process
* However unlike seperate processes, which usually don't share system resources such as memory and I/O connections with other processes, all threads inside a single process share their system resources and some memory
* A process with a single thread is single-threaded, and a process with more than one thread is multithreaded. All processes start out single-threaded. This starting thread is usually called the main thread. The main thread may start new threads, making the process multithreaded
* It's rare to refer to threads at all when a process is single-threaded
* Threads offer a similar mechanism without the overhead of starting a new process
* You can change the way the kernel schedules a process in order to give the process more or less CPU time than other processes. The kernel runs each process according to its scheduling priority
* The higher the number, the less likely the kernel is to schedule the process if others need CPU time
* In fact, you probably won't need to alter nice values much because many Linux systems have only a single user, and that user doesn't perform much real computation
* The load average is the average number of processes currently ready to run
* If a load average goes up to around 1, a single process is probably using the CPU nearly all of the time
* A high load average doesn't necessarily mean that your system is having trouble. A system with enough memory and I/O resources can easily handle many running processes
* However, if the load average is very high and you sense that the system is slowing down, you might be running into memory performance problems
* The kernel assists the MMU(Memory Management Unit) by breaking down the memory used by processes into smaller chunks called pages. The kernel maintains a data structure, called a page table, that maps a process's virtual page address to real page addresses in memory
* If a memory page isn't ready when a process wants to use it, the process triggers a page fault
* There are two kinds of page faults: minor and major
* A minor page fault occurs when the desired page is acutally in main memory, but the MMU doesn't know where it is
* Minor page faults are nothing to worry about, and many occur as a process runs
* A major page fault occurs when the desired memory page isn't in main memory at all, which means that the kernel must load it from the disk or some other slow storage mechanism
* Some major page faults are unavoidable, such as those that occur when you load the code from disk when running a program for the first time
* The other reason the tools exist is that the resources are limited, and for a system to perform well, its components must strive to consume fewer resources
* Likewise, high-performance network servers require intense system resource monitoring because they run many processes to handle multiple requests simultaneously

---

## 9. Userstand Your Network And Its Configurations

* Each machine connected to the network is called a host. One of these is a router, which is a host that can move data from one network to another
* For the most part, you don't have to worry about translating between packets and the data that your application uses, because the operating system does this for you
* A fully functioning network includes a set of network layers called a network stack. Any functional network has a stack
* Application layer contains the "language" that applications and servers use to communicate usually a high-level protocol or some sort
* Application layer processing occurs in user space
* Transport layer defines the data transmission characteristics of the application layer
* Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) are the most common transport layer protocols. The transport layer is sometimes called the protocol layer
* Network or internet layer defines how to move packets from a source host to a destination host
* Physical layer defines how to send raw data across a physical medium such as Ethernet or a modem
* It's important to understand the structure of a network stack because your data must travel through these layers at least twice before it reaches a program at its destination
* The internet's topology is decentralized; it's made up of smaller networks called subnets. The idea is that all subnets are interconnected in someway
* A subnet, defined previously, is a connected group of hosts with IP addresses in a particular range
* You define a subnet with two pieces: a network prefix and a subnet mask
* You can configure a host without a default gateway, but it won't be able to reach hosts outside the destinations in the routing table
* The last thing to know for now about IPv6 is that hosts normally have at least two addresses. The first, which is valid across the internet, is called the global unicast address. The second, for the local network, is called the link local address
* For security reasons, some hosts on the internet disable response to ICMP echo request packets, so you might find that you can connect to a website on a host but not get a ping response
* One of the key points to understand about the internet is that it's a software network
* All devices on an Ethernet network have a Media Access Control (MAC) address, sometimes called a hardware address
* Devices on an Ethernet network send messages in frames, which are wrappers around the data sent. A frame contains the origin and destination MAC addresses
* Although ip shows some hardware information, it's designed primarily for viewing and configuring the software layers attached to the interfaces
* Different distributions have completely different implementations of ifup and ifdown, and as a result, their configuration files are also different
* In Linux, there is a general agreement not to share configuration files among seperate tool suites or libraries, because changes made for one tool could break another
* Most normal network client applications don't particularly care what IP address your machine uses, as long as it works
* Wireless networks add further dimensions to interface configuration, such as network names, authentication, and encryption techniques
* There are several ways to automatically configure networks in Linux based systems. The most widely used option on desktops and notebooks is NetworkManager
* NetworkManager is a deamon that the system starts upon boot
* Upon startup, NetworkManager gathers all available network device information, searches its list of connections, and then decides to try to activate one
* After establishing a connection, NetworkManager maintains it until the connection is lost, a better network becomes available, of the user forces a change
* One of the final basic tasks in any network configuration is hostname resolution with DNS
* The traditional configuration file for DNS servers it /etc/resolv.conf
* The /etc/nsswitch.conf is the traditional interface for controlling serveral name-related precedence settings on your system, such as user and password information, and it has host lookup setting
* The /etc/hosts file should be as short as possible
* The lo interface is a virtual network interface called the loopback because it "loops back" to itself
* Transport layer protocols bridge the gap between the raw packets of the internet layer and the refined needs of applications
* A dynamically assigned port is called an ephemeral port
* On Linux, only processes running as the superuser can use ports 1 through 1023, also known as systen, well-known, or privileged ports
* TCP is popular as a transport layer protocol because it requires relatively little from the application side
* Probably the most important thing to know about DHCP servers is that you want only one running on the same subnet in order to avoid problems with clashing IP addresses or incorrect configurations
* Routers are just computers with more than one physical network interface. You can easily configure a Linux machine to be a router
* NAT is the most commonly used way to share a single IP address with a private network, and it's nearly universal in home and small office networks
* The basic idea behind NAT is that the router doesn't just move packets from one subnet to another; it transforms them as it moves them
* Routers should always include some kind of firewall to keep undesirable traffic out of your network. A firewall is a software and/or hardware configuration that usually sits on a router between the internet and a smaller network, attempting to ensure that nothing "bad" from the internet harms the smaller network
* There are two basic kinds of firewall scenarios: one for protecting individual machines and one for protecting a network of machines
* In principle, wireless Ethernet (Wi-Fi) networks aren't much different from wired networks
* Everything at the network layer and above is the same; the main differences are additional components in the physical layer, such as frequencies, network IDs, and security features
* You shouldn't use WEP because it's not secure, and you won't find many networks that support it

---

## 10.Network Applications And Services

* TCP services are among the easiest to understand because they are built upon simple, uninterrupted two-way data streams
* SSH is the de facto standard for remote access to a Unix machine
* Tunneling is the process of packaging and transporting one network connection within another
* OpenSSH has several host key sets. Each set has a public key and a private key
* If you set up an SSH server on your machine and open it up to the internet, you'll quickly discover constant intrusion attempts. They will be annoying, consume CPU time, and unnecessarily clutter your logs
* If you need more features and flexibility than what scp and sftp offer (for example, if you frequently transfer large numbers of files), have a look at rsync
* If you need to do a lot of packet sniffing, consider using a GUI alternative to tcpdump such as Wireshark
* Because Linux is a very popular Unix flavor on the PC platform, and especially because it is widely used for web servers, it attracts many unpleasant characters who try to break into computer systems
* Run as few services as possible - intruders can't break into services that don't exist on your system
* Block as much as possible with a firewall
* Track the services that you offer to the internet - if you run an SSH server, Postfix, or similiar services, keep your software up to date and get appropiate security alerts
* Use long term support distribution releases for servers
* Don't give an account on your system to anyone who doesn't need one
* Avoid installing dubious binary packages
* There are three basic kinds of network attacks that can be directed at a Linux machine:
	* Full compromise
	* DoS attack
	* Malware
* Some services are chronic attack targets due to poor implementation and design. You should always deactivate the following services:
	* ftpd
	* telnetd, rlogind, rexecd
* On Unix systems, a process uses a socket to identify when and how it's talking to the network. Sockets are the interface that processes use to access the network through the kernel

---

## 11. Introduction To Shell Scripts

* The shell script is only one tool for Unix programming, and although scripts have considerable power, they also have limitations
* Be aware of your shell script sizes. Keep you shell scripts short
* When you use quotes, you're often trying to create a literal, a string that the shell should not analyze before passing it to the command line
* The easiest way to create a literal and make the shell leave a string alone is to enclose the entire string in single quotes
* When you need to use a literal, you should always turn to single quotes first, because you're guaranteed that the shell won't try any substitutions
* Double quotes work just like single quotes, except that the shell expands any variables that appear within double quotes
* $1, $2, and all variables named as positive nonzero integers contain the values of the script parameters, or arguments
* The built-in shell command shift can be used with argument variables to remove the first argument ($1) and advance the rest of the arguments so that $2 becomes $1, $3 becomes $2, and so on
* The $# variable holds the number of arguments passed to a script and is especially important when you're running shift in a loop to pick through arguments
* The $0 variable holds the name of the script and is useful for diagnostic messages
* The $$ variable holds the process ID of the shell
* The $? variable holds the exit code of the last command the shell executed
* When the exit code is zero, it typically means that the program ran without a problem. However, if the program has an error, it usually exits with a number other than 0
* Note that some programs, like diff and grep, use nonzero exit codes to indicate normal conditions
* If you think a program might be using a nonzero exit code to indicate success, read its manual page
* There are dozens of test operations, all of which fall into three general categories: file tests, string tests, and arithmetic tests
* The awk command if not a simple single-purpose command; it's actually a powerful programming language

---

## 12. Network File Transfer And Sharing

* On Linux, rsync is the standard synchronizer, offering good performance and many useful ways to perform transfers
* To get rsync working between two hosts, you must install the rsync program on both the source and destination, and you'll need a way to access one machine from the other
* The standard file sharing suite for Unix is called Samba
* One of the most commonly used traditional systems for file sharing among Unix systems is NFS

---

## 13. User Environments

* If you've had your Linux machine for a while, you might have noticed that your home directory accumulates a bafflingly large array of startup files over time. These are sometimes called dot files because they nearly always start with a dot
* When designing startup files, keep the user in mind
* Simplicity - keep the number of startup files small, and keep the files as short and simple as possible so that they're easy to modify but hard to break
* Readability - use extensive comments in files so that the users get a good picture of what each part of a file does
* Before making a change to a startup file, ask yourself whether you really should be making it
* The most important part of any shell startup file is the command path
* Most Linux distributions install executables for nearly all packaged user software in /usr/bin
* As with shell startup files, avoid large default editor startup files
* Avoid these pitfalls in startup files:
	* Don't put any kind of graphical command in a shell startup file
	* Don't set the DISPLAY environment variable in a shell startup file
	* Don't set the terminal type in a shell startup file
	* Don't run commands in a startup file that print to the standard output
	* Never set LD_LIBRARY_PATH in a shell startup file
	
---

## 14. A Brief Survey Of The Linux Desktop And Printing

* At the bottom of any graphical display mechanism is the framebuffer, a chunk of memory that the graphics hardware reads and transmits to the screen for display

---

## 15. Development Tools

* Most Linux utilities and many applications on Linux systems are written in C or C++
* Linking a program against a shared library doesn't copy the code into the final executable; it just adds references to names in the code of the library file
* There is one more place that ld.so looks for shared libraries: the environment variable LD_LIBRARY_PATH
* The number one cause of all shared library problems is the environment variable LD_LIBRARY_PATH
* Never set LD_LIBRARY_PATH is shell startup files or when compiling software
* If you must use LD_LIBRARY_PATH to run some crummy program for which you don't have the  source use a wrapper script
* The default include directory in Unix is /usr/include
* Double quotes mean that the header file is not in a system include directory, and usually indicate that the include file is in the same directory as the source file
* The first thing you need to know about any scripting language is that the first line of a script looks like the shebang if a Bourne shell script

---

## 16. Introduction To Compiling Software Form C Source Code

* You probably shouldn't update your machine by installing everything from source code, unless you really enjoy the process or have some other reason
* Before you unpack, verify the contents of the archive with tar tvf or tar ztvf, because some packages don't create their own subdirectories in the directory where you extract the archive
* Beware of packages that contain files with absolute pathnames
* The most important environment variables are CPPFLAGS, CFLAGS and LDFLAGS
* Many libraries now use the pkg-config program not only to advertise the locations of their include files and libraries but also to specify the exact flags you need to compile and link a program
* If you look behind the scenes, you'll find that pkg-config finds package information by reading configuration files that end with .pc
* You won't see .pc files for many packages unless you install the development packages
* If you have a vital interest in network servers such as Apache, the best way to get complete control is to install the servers yourself
* It's important to know the difference between an error and an ignored error

---

## Virtualization

* Overseeing one or more virtual machines on a computer is a piece of software called a hypervisor or virtual machine monitor
* In general, a virtual machine with its operating system is called a guest. The host is whatever runs the hypervisor
* Common uses of virtual machines
	* Testing and trails - virtual machines allow you to do this without having to purchase new hardware
	* Application compatability
	* Servers and cloud services - all cloud services are built on virtual machine technology
* If you don't remove docker images, they can add up over time. Depending on what's in the images and how they are built, this can consume a significant amount of storage space on your system

---

You can get the book from here:

<a href="https://www.amazon.com/How-Linux-Works-Brian-Ward/dp/1718500408?crid=2RKEFBNF1CTIG&keywords=how+linux+works&qid=1658230169&s=books&sprefix=how+linux+works%2Cstripbooks%2C287&sr=1-1&linkCode=li2&tag=dev91-20&linkId=690fcb05e2320e81576789de3e9f331b&language=en_US&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1718500408&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=dev91-20&language=en_US" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=dev91-20&language=en_US&l=li2&o=1&a=1718500408" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

---

Like me work? I post about a variety of topics, if you would like to see more please like and follow me.
Also I love coffee. 

[![“Buy Me A Coffee”](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ethand9999)
