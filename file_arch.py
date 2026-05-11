import os

def print_folders(path, depth=0, max_depth=2, indent=""):
    if depth >= max_depth:
        return

    try:
        dirs = [
            d for d in sorted(os.listdir(path))
            if os.path.isdir(os.path.join(path, d))
        ]
    except PermissionError:
        return

    for i, folder in enumerate(dirs):
        full_path = os.path.join(path, folder)
        is_last = i == len(dirs) - 1

        connector = "└── " if is_last else "├── "
        print(indent + connector + folder)

        new_indent = indent + ("    " if is_last else "│   ")
        print_folders(full_path, depth + 1, max_depth, new_indent)


if __name__ == "__main__":
    project_dir = os.path.dirname(os.path.abspath(__file__))

    print(project_dir)
    print_folders(project_dir, max_depth=2)