import { View, Text, StyleSheet, Pressable, useWindowDimensions, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADII, FONTS } from '../theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ProfileScreen() {
    const [theme, setTheme] = useState('light');
    const [isFollowing, setIsFollowing] = useState(false);

    const [expanded, setExpanded] = useState(false);

    const currentTheme = COLORS[theme];
    const { width } = useWindowDimensions();
    const isLargeScreen = width > 500;

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={[styles.container, { backgroundColor: currentTheme.bg }]}>

            <Pressable onPress={toggleTheme} style={styles.themeToggle}>
                <Ionicons
                    name={theme === 'light' ? 'moon' : 'sunny'}
                    size={28}
                    color={currentTheme.text}
                />
            </Pressable>

            <View style={[
                styles.card,
                {
                    backgroundColor: currentTheme.card,
                    width: isLargeScreen ? '60%' : '85%',
                    padding: isLargeScreen ? SPACING.xl : SPACING.lg,
                }
            ]}>

                <Ionicons
                    name="person-circle-outline"
                    size={isLargeScreen ? 100 : 80}
                    color={currentTheme.text}
                />

                <Text style={[styles.name, { color: currentTheme.text }]}>
                    Berra Turan
                </Text>

                <Text style={[styles.role, { color: currentTheme.text }]}>
                    Mobile Developer
                </Text>

                <Pressable onPress={toggleExpand} style={styles.expandButton}>
                    <Text style={[styles.expandText, { color: currentTheme.text }]}>
                        {expanded ? 'Less Details' : 'More Details'}
                    </Text>
                    <Ionicons
                        name={expanded ? "chevron-up" : "chevron-down"}
                        size={20}
                        color={currentTheme.text}
                    />
                </Pressable>

                {expanded && (
                    <View style={styles.detailsContainer}>
                        <View style={styles.locationContainer}>
                            <Ionicons name="location-sharp" size={16} color={currentTheme.text} style={{ opacity: 0.6 }} />
                            <Text style={[styles.locationText, { color: currentTheme.text }]}>
                                İstanbul, Turkey
                            </Text>
                        </View>

                        <Text style={[styles.bio, { color: currentTheme.text }]}>
                            React Native geliştiricisi. Mobil uygulamalar tasarlamayı ve kodlamayı seviyorum. 🚀
                        </Text>

                        <Pressable
                            style={[
                                styles.followButton,
                                {
                                    backgroundColor: isFollowing ? 'transparent' : '#2196F3',
                                    borderColor: isFollowing ? currentTheme.text : 'transparent',
                                    borderWidth: isFollowing ? 2 : 0,
                                }
                            ]}
                            onPress={() => setIsFollowing(!isFollowing)}
                        >
                            <Text style={[
                                styles.followText,
                                { color: isFollowing ? currentTheme.text : '#FFF' }
                            ]}>
                                {isFollowing ? 'Following' : 'Follow'}
                            </Text>
                        </Pressable>
                    </View>
                )}

                <Pressable
                    style={({ pressed }) => [
                        styles.likeButton,
                        { backgroundColor: pressed ? '#e63946' : '#ff6b6b' }
                    ]}
                    onPress={() => console.log('Profile Liked!')}
                >
                    <Ionicons name="heart" size={24} color="#fff" />
                    <Text style={styles.likeText}>Like</Text>
                </Pressable>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    themeToggle: {
        position: 'absolute',
        top: 50,
        right: 20,
        padding: SPACING.sm,
    },
    card: {
        borderRadius: RADII.md,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    name: {
        fontFamily: FONTS.bold,
        fontSize: 24,
        marginTop: SPACING.md,
    },
    role: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        marginTop: SPACING.sm,
        opacity: 0.7,
    },
    expandButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.md,
        padding: SPACING.sm,
    },
    expandText: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        marginRight: 4,
        opacity: 0.6,
    },
    detailsContainer: {
        alignItems: 'center',
        width: '100%',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.sm,
        marginBottom: SPACING.md,
    },
    locationText: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        marginLeft: 4,
        opacity: 0.6,
    },
    bio: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: SPACING.md,
        opacity: 0.8,
        lineHeight: 20,
    },
    followButton: {
        marginTop: SPACING.lg,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 150,
    },
    followText: {
        fontFamily: FONTS.bold,
        fontSize: 16,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        borderRadius: 50,
        marginTop: SPACING.md,
    },
    likeText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: 16,
        marginLeft: SPACING.sm,
    },
});