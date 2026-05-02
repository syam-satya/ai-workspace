def extract_text(file):
    try:
        text = file.read().decode("utf-8", errors="ignore")
        return text if text else ""
    except:
        return ""