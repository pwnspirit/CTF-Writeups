### ELF x86 - Stack buffer overflow basic 1

Here is the `C` code which is given in the chall. 

<details>
<summary>C code</summary>
  
```c
#include <unistd.h>
#include <sys/types.h>
#include <stdlib.h>
#include <stdio.h>
 
int main()
{
 
  int var;
  int check = 0x04030201;
  char buf[40];
 
  fgets(buf,45,stdin);
 
  printf("\n[buf]: %s\n", buf);
  printf("[check] %p\n", check);
 
  if ((check != 0x04030201) && (check != 0xdeadbeef))
    printf ("\nYou are on the right way!\n");
 
  if (check == 0xdeadbeef)
   {
     printf("Yeah dude! You win!\nOpening your shell...\n");
     setreuid(geteuid(), geteuid());
     system("/bin/bash");
     printf("Shell closed! Bye.\n");
   }
   return 0;
}
```
</details>


Let's access the server via `ssh`. and try to solve the chall.

```bash

ssh -p 2222 app-systeme-ch13@challenge02.root-me.org
```

Here, we have some files which got my attention.

<img width="1097" height="291" alt="image" src="https://github.com/user-attachments/assets/0f960bfd-a5cc-4b96-a72c-81c3ae689de3" />

We have a `.passwd` file, and it seems like there we can get the flag for the chall. Unfortunately. we cann't access the file, as we don't have access for it.

<img width="889" height="331" alt="image" src="https://github.com/user-attachments/assets/4e81e592-3263-424d-a447-40b26b7d1a05" />

Now, let's dive into the vulnerable code and spawn the shell,

We have `char buf[40];` buffer set but the program allows `fgets(buf, 45, stdin);` 45 long buffer. So, my metholodogy will be
1. The `check` variable is stored right after the buffer in memory.
2. By overflowing the buffer, we can overwrite `check`.
3. We need to change `check` to `0xdeadbeef`.


























































