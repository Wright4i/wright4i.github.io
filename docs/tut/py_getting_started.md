# Getting Started with Python on IBM i

Welcome to the beginning of your journey with Python on the IBM i platform! This guide is designed to help RPG programmers like you get up to speed with Python, a powerful and versatile programming language that can greatly enhance your capabilities on IBM i.

## Why Python?

Python is an interpreted, high-level, and general-purpose programming language. It's known for its readability and support for multiple programming paradigms. Here's why you might want to add Python to your toolkit:

- **Ease of learning:** Python has a simple syntax that's easy to grasp for beginners.
- **Extensive libraries:** Python's vast ecosystem of libraries and frameworks can help you accomplish a wide range of tasks, from web development to data analysis.
- **Integration capabilities:** Python can easily integrate with RPG applications and DB2 on IBM i, allowing for powerful data manipulation and scripting.

## Prerequisites

Before you begin, ensure that you have:

- An IBM i system running IBM i 7.1 or later.
- Authority to install programs on the system.
- Basic knowledge of IBM i operations.

## Installing Python on IBM i

To get Python up and running on your IBM i, follow these steps:

1. **Access ACS (Access Client Solutions):** Use ACS to connect to your IBM i system.
2. **Open Source Package Management:** In ACS click the Package Manager and connect to your system with SSH (`STRTCPSVR *SSH` if necessary).
3. **Available Packages:** Find `python39` and click install.

## Writing Your First Python Script

Once you have Python installed, you can start writing simple scripts. 

1. Connect with SSH or open a Terminal to PASE.
2. Type `python3` to open the Python interpreter

Here's a "Hello, World!" in Python:

```python
print("Hello, World!")
```

You can also save this to a file on the IFS named `hello_world.py`

To run this script, type `python3 hello_world.py` in your terminal.

## Calling Python from an RPG Program

You can leverage the power of Python within your RPG applications by calling Python scripts directly from your RPG programs. This example assumes you have a Python script named `example.py` located in the `/python/scripts` directory on the IFS.

Here's a basic example of how an RPGLE program can call a Python script:

```rpgle
**FREE
// Prototype for QCMDEXC
dcl-pr QCMDEXC extpgm;
    *n char(32000) const options(*varsize);
    *n packed(15:5) const;
end-pr;

// Command string to call the Python script
dcl-s cmdStr varchar(256);
dcl-s cmdLen packed(15:5);

// Set the command string to call the Python script using QSH
cmdStr = 'QSH CMD(''/QOpenSys/pkgs/bin/python3 /python/scripts/example.py'')';
cmdLen = %len(%trimr(cmdStr));

// Call the QCMDEXC program to execute the command
QCMDEXC(cmdStr: cmdLen);
**END-FREE


## Learning Resources

To deepen your Python knowledge, here are some resources:

- [The Python Tutorial](https://docs.python.org/3/tutorial/index.html) – Python's official tutorial.
- [IBM i OSS Resources](https://ibm.github.io/ibmi-oss-resources/) – IBM i OSS Resources.
- [Real Python](https://realpython.com/) – Real-world advice for Python developers.
- [Python Cheatsheet](https://github.com/gto76/python-cheatsheet) – Quick Reference guide. 
- [Awesome Python](https://github.com/vinta/awesome-python) – A curated list of Python Packages.
- [Club-Seiden Examples](https://github.com/Club-Seiden/python-for-IBM-i-examples/tree/master/non-wheel) – Example IBM i Python programs including how to connect with DB2.