import { Stack } from 'expo-router';

export default function GoalSetupLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="department" />
            <Stack.Screen name="subjects" />
        </Stack>
    );
}
